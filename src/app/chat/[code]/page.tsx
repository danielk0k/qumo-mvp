"use client";

import { useChat } from "ai/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const welcome_msg =
  "Hey, nice meeting you today! To get started, please type 'ready' and I will begin asking you some questions for this research.";

export default function Chat({ params }: { params: { code: string } }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [{ role: "assistant", content: welcome_msg, id: "" }],
  });

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="flex flex-col mx-auto max-w-2xl justify-center p-4">
      <Card>
        <CardHeader>
          <CardTitle>Test Research</CardTitle>
          <CardDescription>5 questions to get to know you</CardDescription>
        </CardHeader>
        <CardContent
          className="flex flex-col max-h-96 overflow-y-auto mb-4 odd:justify-end"
          ref={contentRef}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className="whitespace-pre-wrap my-2 rounded-md bg-accent p-4 max-w-xs"
            >
              <p className="font-bold">
                {message.role === "user" ? "User" : "Qumo"}
              </p>
              <p className="mt-1">{message.content}</p>
            </div>
          ))}
        </CardContent>
        <form onSubmit={handleSubmit}>
          <CardFooter className="space-x-2 border-t pt-6">
            <Input
              value={input}
              placeholder="Enter your response here"
              onChange={handleInputChange}
            />
            <Button type="submit">Send</Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
