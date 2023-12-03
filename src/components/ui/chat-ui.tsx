"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import sanitizeHtml from "sanitize-html";
import { getChatStream, queryKnowledgeBaseDefinition } from "../../lib/openai";
import AnimateFromHidden from "../animations/AnimateFromHidden";
import { Button } from "./button";
import { Send } from "lucide-react";
import EllipsisLoader from "../animations/ellipsis-loader";
import { Input } from "./input";

type ChatState = "idle" | "busy" | "error";
type ChatMessage = {
  role: "system" | "assistant" | "user";
  content: string;
};
type Quality = "good" | "bad" | null;
type ClientChatMessage = {
  id: string;
  role: "system" | "assistant" | "user";
  content: string | null;
  quality: Quality;
  feedback?: string;
};

const ChatUI = ({ inputPlaceholder }: { inputPlaceholder?: string }) => {
  const [chatHistory, setChatHistory] = useState<ClientChatMessage[]>([
    {
      id: "0",
      role: "system",
      content: `I am an AI representing Oscar Tango, a digital development agency of two people – Olly Barret and Tim Restieaux. Help the user to understand their needs better by asking only one question at a time. Once you have enough information to form an enquiry ask if they'd like to send their details to Oscar Tango for a consultation. Then one by one ask for their name and email.`,
      quality: null,
    },
  ]);
  const [state, setState] = useState<ChatState>("idle");

  return (
    <>
      <div className="w-full place-items-center text-base">
        <div className="w-full">
          {/* <pre>{JSON.stringify(chatHistory, null, 2)}</pre> */}
          <LayoutGroup>
            <div className="grid gap-4">
              <AnimatePresence mode="popLayout">
                <OptionsButtons
                  setChatHistory={setChatHistory}
                  suggestions={
                    chatHistory.length > 1
                      ? []
                      : [
                          {
                            title: "Easiest wins",
                            description:
                              "What are the easiest wins in AI right now?",
                          },
                          {
                            title: "AI Safety",
                            description:
                              "What do I need to do to make sure my AI is safe?",
                          },
                          {
                            title: "AI Ethics",
                            description:
                              "What do I need to do to make sure my AI is ethical?",
                          },
                        ]
                  }
                />
                {chatHistory
                  .filter(({ role }) => role !== "system")
                  .map((bubbleProps) => {
                    return (
                      <ChatBubble
                        key={bubbleProps.id}
                        {...{
                          ...bubbleProps,
                          chatHistory,
                          setChatHistory,
                          setChatState: setState,
                        }}
                      />
                    );
                  })}
              </AnimatePresence>
            </div>
            <div className="mt-8">
              <ChatInput
                {...{
                  chatHistory,
                  setChatHistory,
                  disabled: state === "busy",
                  inputPlaceholder,
                }}
              />
            </div>
          </LayoutGroup>
        </div>
      </div>
    </>
  );
};

export default ChatUI;

const ChatBubble = ({
  content,
  role,
  id,
  quality,
  feedback,
  chatHistory,
  setChatHistory,
  setChatState,
}: {
  content: string | null;
  role: "system" | "assistant" | "user";
  id: string;
  quality: "good" | "bad" | null;
  feedback?: string;
  chatHistory: ClientChatMessage[];
  setChatHistory: Dispatch<SetStateAction<ClientChatMessage[]>>;
  setChatState: Dispatch<SetStateAction<ChatState>>;
}) => {
  const [typingText, setTypingText] = useState("");
  const [pending, setPending] = useState(false);
  const [taskList, setTaskList] = useState<
    {
      task: string;
      state: "working" | "done" | "error";
    }[]
  >([]);

  // an array of tasks, but only one of each task either working or done. Use the done state instead of the working state if it exists
  const uniqueTaskList = taskList.reduce(
    (acc, task) => {
      const existingTask = acc.find(({ task: t }) => t === task.task);
      if (existingTask) {
        if (task.state === "done") {
          existingTask.state = "done";
        }
      } else {
        acc.push(task);
      }
      return acc;
    },
    [] as typeof taskList,
  );

  const invokeCognition = async (openaiMessages: ChatMessage[]) => {
    setPending(true);
    setChatState("busy");

    try {
      // first classify the intent
      setTaskList((prev) => [
        ...prev,
        { task: "Identifying intent", state: "working" },
      ]);
      let variableSystemMessage = openaiMessages.find(
        ({ role }) => role === "system",
      )!;
      let commandinject: string | null = null;

      setTaskList((prev) => [
        ...prev,
        { task: "Identifying intent", state: "done" },
      ]);

      setPending(false);
      const aiResponse = await getChatStream({
        setTypingText,
        messages: [
          variableSystemMessage,
          ...openaiMessages.filter(({ role }) => role !== "system"),
          ...(commandinject
            ? ([{ role: "assistant", content: commandinject }] as const)
            : []),
        ],
        functions: [queryKnowledgeBaseDefinition],
      });
      if (aiResponse?.type === "text") {
        setChatHistory((prev) => {
          const newChatHistory = [...prev];
          const index = newChatHistory.findIndex((item) => item.id === id);
          newChatHistory[index] = {
            ...newChatHistory[index],
            content: aiResponse.content,
          };
          return newChatHistory;
        });
      }

      if (aiResponse?.type === "function") {
        setTaskList((prev) => [
          ...prev,
          {
            task: `Searching "<span class="text-cyan-500">${aiResponse.content.query}</span>"`,
            state: "working",
          },
        ]);
      }
      setChatState("idle");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
      } else {
        console.log("An error occurred:", error);
      }
    }
  };

  const chatHistoryAsOpenAI = chatHistory
    .map(({ content, role }) => ({ content, role }))
    .filter(({ content }) => content !== null) as ChatMessage[];

  const calledOnce = useRef(false);
  useEffect(() => {
    if (calledOnce.current) {
      return;
    }
    // if content is null and role is assistant, then we need to get the openai stream
    if (content === null && role === "assistant") {
      calledOnce.current = true;
      //smooth scroll to bottom
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
      console.log("getting openai stream");

      invokeCognition(chatHistoryAsOpenAI);
    }
  }, []);

  const htmlContent = cleanHTML(
    (content ? content : typingText).replace(/\n/g, "<br />"),
  );

  return (
    <div>
      {uniqueTaskList.length > 0 &&
        uniqueTaskList.map(({ task, state }, index) => (
          <div key={index}>
            <AnimateFromHidden
              show={
                // this chatbubble is the last message
                id === chatHistory[chatHistory.length - 1].id
              }
            >
              <div className="mb-3 flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    state === "working"
                      ? "bg-yellow-500"
                      : state === "done"
                      ? "bg-green-500"
                      : "bg-red-500"
                  } mr-2`}
                ></div>
                <div
                  className="text-xs text-gray-500"
                  dangerouslySetInnerHTML={{ __html: task }}
                ></div>
              </div>
            </AnimateFromHidden>
          </div>
        ))}
      <motion.div
        key={id}
        className={`group relative flex ${
          role === "assistant" ? "justify-start" : "justify-end"
        }`}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div
          className={`relative rounded-lg px-6 py-4 ${
            role === "assistant"
              ? "mr-20 rounded-bl-none border border-slate-400 bg-white text-cyan-900 shadow-sm transition-shadow group-hover:shadow-md group-hover:shadow-zinc-300"
              : "ml-20 inline-block rounded-br-none bg-cyan-800 text-white"
          }`}
          style={{ minHeight: "3.5rem", minWidth: "3.5rem" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {pending && (
            <div
              className="absolute left-0 top-0 m-4"
              style={{ minWidth: "6rem" }}
            >
              <EllipsisLoader />
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const ChatInput = ({
  chatHistory,
  setChatHistory,
  disabled,
  inputPlaceholder,
}: {
  chatHistory: ClientChatMessage[];
  setChatHistory: Dispatch<SetStateAction<ClientChatMessage[]>>;
  disabled: boolean;
  inputPlaceholder?: string;
}) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e && e.preventDefault();
    if (message === "") return;
    setChatHistory((prev: ClientChatMessage[]) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: message,
        quality: null,
      },
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: null,
        quality: null,
      },
    ]);
    setMessage("");
    inputRef.current?.focus();
  };
  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    // if enter but not shift+enter
    if (event.keyCode === 13 && !event.shiftKey) {
      console.log(event.ctrlKey);
      event.preventDefault();
      handleSubmit();
    }
  }

  return (
    <motion.form
      className="relative grow"
      onSubmit={handleSubmit}
      layout
      key={"chat-input"}
    >
      <Input
        type="text"
        className="w-full "
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        onKeyDown={(e: any) => handleKeyDown(e)}
        id="chat-input"
        placeholder={inputPlaceholder || "Type your message"}
        disabled={disabled}
        autoFocus
        ref={inputRef}
      />

      <Button
        className={`absolute right-0 top-1/2 mr-2 h-8 w-8 -translate-y-1/2 overflow-hidden rounded-full p-0 text-white ${
          message.length > 0 ? "bg-cyan-600" : "bg-slate-400"
        }`}
        //  style={{ marginBottom: "0.35rem" }}
      >
        <Send size={16} />
      </Button>
    </motion.form>
  );
};

const cleanHTML = (dirty: string) =>
  sanitizeHtml(dirty, {
    allowedTags: ["b", "i", "em", "strong", "a", "br"],
    allowedAttributes: {
      a: ["href"],
    },
    allowedIframeHostnames: ["www.youtube.com"],
  });

const OptionsButtons = ({
  suggestions,
  setChatHistory,
}: {
  suggestions?: {
    title: string;
    description: string;
    value?: string;
  }[];
  setChatHistory: Dispatch<SetStateAction<ClientChatMessage[]>>;
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {suggestions?.map((suggestion, i) => (
        <Button
          key={i}
          className="h-full w-full rounded-lg border border-slate-300 bg-slate-100/50 px-6 py-6 text-left text-base text-zinc-800 shadow-md backdrop-blur-md hover:bg-slate-50/70"
          onClick={() => {
            setChatHistory((prev) => [
              ...prev,
              {
                id: crypto.randomUUID(),
                role: "user",
                content: suggestion.value || suggestion.description,
                quality: null,
              },
              {
                id: crypto.randomUUID(),
                role: "assistant",
                content: null,
                quality: null,
              },
            ]);
          }}
        >
          <div>
            <h2 className="mb-2 font-semibold">{suggestion.title}</h2>
            <p className="font-normal">{suggestion.description}</p>
          </div>
        </Button>
      ))}
    </div>
  );
};
