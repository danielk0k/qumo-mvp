import { StreamingTextResponse } from "ai";
import toReadableStream from "to-readable-stream";

const questions = [
  "What do you enjoy doing in your free time?",
  "Have you traveled anywhere recently, and if so, what was your favorite part of the trip?",
  "What's your go-to book, movie, or TV show recommendation?",
  "If you could have dinner with any historical figure, living or dead, who would it be and why?",
  "Do you have any upcoming exciting plans or events that you're looking forward to?"
];

export async function POST(req: Request) {
  const { messages } = await req.json();
  const i = (messages.length / 2) - 1
  if (i >= questions.length) {
    return new StreamingTextResponse(toReadableStream("Thank you for your participation. You may close this window."));
  }
  return new StreamingTextResponse(toReadableStream(questions[i]));
}
