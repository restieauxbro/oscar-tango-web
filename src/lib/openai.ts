import { createParser } from "eventsource-parser";

export type ChatMessage = {
  role: "system" | "assistant" | "user";
  content: string;
};
export const queryKnowledgeBaseDefinition = {
  name: "retrieve-from-knowledge-base",
  description:
    "Retreive information from the knowledge base about service offerings but not programmes",
  parameters: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "The query to search for",
      },
    },
    required: ["query"],
  },
};

export type OpenAIFunctionDefinition = typeof queryKnowledgeBaseDefinition;

export const getChatStream = async ({
  setTypingText,
  messages,
  functions,
}: {
  setTypingText: React.Dispatch<React.SetStateAction<string>>;
  messages: ChatMessage[];
  functions?: OpenAIFunctionDefinition[];
}): Promise<
  | {
      type: "text";
      content: string;
    }
  | {
      type: "function";
      content: {
        [key: string]: any;
      };
    }
  | undefined
> => {
  try {
    console.log("calling openai");
    let text = "";
    let cognitionState: undefined | "text" | "function" = undefined;
    const onParse = (event: any) => {
      if (event.type === "event") {
        try {
          const data: {
            choices: {
              delta: {
                content?: string;
                function_call?: {
                  name: string;
                  arguments: string;
                };
                finish_reason: null | "stop" | "timeout";
              };
            }[];
          } = JSON.parse(event.data);
        } catch (e) {
          console.log(e);
        }
      }
    };

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages,
        functions,
      }),
    });
    const reader = response?.body?.getReader();
    const decoder = new TextDecoder();
    const parser = createParser(onParse);
    while (reader) {
      const { value, done } = await reader.read();
      const dataString = decoder.decode(value);
      setTypingText((prev) => prev + dataString);
      if (done || dataString.includes("[DONE]")) {
        if (cognitionState === "function") {
          return {
            type: "function",
            content: JSON.parse(text),
          };
        }
        return {
          type: "text",
          content: text,
        };
      }
      parser.feed(dataString);
    }
  } catch (error) {
    console.log(error);
  }
};
