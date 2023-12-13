import { get } from "http";

export type ChatMessage = {
  role: "system" | "assistant" | "user";
  content: string;
};

export type OpenAIFunctionDefinition = {
  name: string;
  description: string;
  parameters: {
    type: string;
    properties: {
      [key: string]: {
        type: string;
        description: string;
        enum?: Array<string | number>;
      };
    };
    required: string[];
  };
};

export type FunctionCallResult = {
  type: "function";
  content: {
    name: string;
    arguments: { [key: string]: any };
  };
};

export const getChatStream = async ({
  setTypingText,
  useFunctionJson,
  messages,
  functions,
}: {
  setTypingText: React.Dispatch<React.SetStateAction<string>>;
  useFunctionJson?: (returnedJson: string) => void; // if the function returns JSON, this function will be called with the JSON to make UI changes as it's streamed
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
    let buffer = "";
    let bufferUsed = false;
    let cognitionState: undefined | "text" | "function" = undefined;

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages,
        functions,
        //   function_call: "send_clients_details",
      }),
    });
    const reader = response?.body?.getReader();
    const decoder = new TextDecoder();
    while (reader) {
      const { value, done } = await reader.read();
      const dataString = decoder.decode(value);
      buffer += dataString;

      const FUNCTION_CALL_PREFIX = `{"func`;
      // if text starts with { wait to see if it becomes {"function_call" in a few events time
      if (buffer.length === 1 && buffer[0] !== "{") {
        // If the first character is not '{', update immediately
        setTypingText((prev) => prev + buffer + dataString);
      } else if (buffer.length >= FUNCTION_CALL_PREFIX.length) {
        // If the buffer is long enough, check for function call
        if (buffer.startsWith(FUNCTION_CALL_PREFIX)) {
          // Handle function call
          cognitionState = "function";
          useFunctionJson && useFunctionJson(buffer);
        } else {
          // Not a function call, update the state with the buffered data
          let textForState = bufferUsed ? dataString : buffer;
          setTypingText((prev) => prev + textForState);
          bufferUsed = true;
        }
      }

      if (done || dataString.includes("[DONE]")) {
        if (cognitionState === "function") {
          let parsedObject = JSON.parse(buffer);
          // Now parse the nested JSON string in the 'arguments' property
          parsedObject.function_call.arguments = JSON.parse(
            parsedObject.function_call.arguments,
          );
          return {
            type: "function",
            content: parsedObject.function_call,
          } as FunctionCallResult;
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

export const queryKnowledgeBaseDefinition: OpenAIFunctionDefinition = {
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

export const contactOTDefnition: OpenAIFunctionDefinition = {
  name: "send_clients_details",
  description:
    "Capture the user as a lead once they have given their contact details",
  parameters: {
    type: "object",
    properties: {
      first_name: {
        type: "string",
        description: "User's first name",
      },
      last_name: {
        type: "string",
        description: "User's last name",
      },
      company_name: {
        type: "string",
        description: "User's company name",
      },
      email: {
        type: "string",
        description: "User's email address",
      },
      client_summary: {
        type: "string",
        description:
          "A 3 - 4 sentence summary of this potential client's needs",
      },
      rating: {
        type: "number",
        description: "The quality of the lead",
        enum: [1, 2, 3, 4, 5],
      },
    },
    required: ["email", "rating"],
  },
};

type FunctionReturnType = {
  [K in keyof OpenAIFunctionDefinition['parameters']['properties']]: OpenAIFunctionDefinition['parameters']['properties'][K]['type']
};