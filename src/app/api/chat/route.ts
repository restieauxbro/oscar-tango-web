import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, functions, function_call } = await req.json();
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages,
    functions,
    function_call,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
