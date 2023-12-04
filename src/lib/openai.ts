import { createParser } from "eventsource-parser";

export type ChatMessage = {
  role: "system" | "assistant" | "user";
  content: string;
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
    let buffer = "";
    let cognitionState: undefined | "text" | "function" = undefined;

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages,
        functions,
      }),
    });
    const reader = response?.body?.getReader();
    const decoder = new TextDecoder();
    while (reader) {
      const { value, done } = await reader.read();
      const dataString = decoder.decode(value);
      buffer += dataString;

      const FUNCTION_CALL_PREFIX = `{"function_call":`;
      // if text starts with { wait to see if it becomes {"function_call" in a few events time
      if (buffer.length === 1 && buffer[0] !== "{") {
        // If the first character is not '{', update immediately
        setTypingText((prev) => prev + dataString);
      } else if (buffer.length >= FUNCTION_CALL_PREFIX.length) {
        // If the buffer is long enough, check for function call
        if (buffer.startsWith(FUNCTION_CALL_PREFIX)) {
          // Handle function call
          cognitionState = "function";
        } else {
          // Not a function call, update the state with the buffered data
          console.log("not a function call", { buffer, dataString });
          setTypingText((prev) => prev + dataString);
        }
      }

      if (done || dataString.includes("[DONE]")) {
        if (cognitionState === "function") {
          return {
            type: "function",
            content: JSON.parse(buffer),
          };
        }
        return {
          type: "text",
          content: buffer,
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
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
