import { StreamingTextResponse } from "ai";
import { NextRequest } from "next/server";
import toReadableStream from "to-readable-stream";
import supabaseClient from "@/lib/supabaseClient";

async function post_chat_log(id: string, log: []) {
  const {data} = await supabaseClient.from("research_response").insert({
    research_id: id,
    chat_log: JSON.stringify(log),
  })
}

export async function POST(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const { data } = await supabaseClient
    .from("research_collection")
    .select("research_id, research_questions")
    .eq("research_id", id);
  const questions = data ? JSON.parse(data[0].research_questions) : [];
  const { messages } = await req.json();
  const i = messages.length / 2 - 1;
  if (i >= questions.length) {
    post_chat_log(id || "", messages)
    return new StreamingTextResponse(
      toReadableStream(
        "Thank you for your participation. You may close this window."
      )
    );
  }
  return new StreamingTextResponse(toReadableStream(questions[i]));
}
