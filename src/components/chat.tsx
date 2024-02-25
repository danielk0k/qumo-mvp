"use client";

import { useChat } from "ai/react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DEFAULT_WELC_MSG =
  "Hey, nice meeting you today! To get started, please type 'ready' and I will begin asking you some questions.";

export default function Chat({ id }: { id: string }) {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      { role: "assistant", content: DEFAULT_WELC_MSG, id: "welcome-msg" },
    ],
    api: `/api/chat?id=${id}`,
  });

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <CardContent
        className="grid grid-cols-2 max-h-96 overflow-y-auto mb-4"
        ref={contentRef}
      >
        {messages.map((message, index) => {
          if (index % 2 == 0) {
            return (
              <div
                key={message.id}
                className="whitespace-pre-wrap col-span-2 col-start-1 my-2 rounded-md bg-purple-200 p-4 max-w-xs"
              >
                <p className="font-bold">Qumo</p>
                <p className="mt-1">{message.content}</p>
              </div>
            );
          } else {
            return (
              <div
                key={message.id}
                className="whitespace-pre-wrap col-span-2 col-start-2 my-2 rounded-md bg-blue-200 p-4 max-w-xs"
              >
                <p className="font-bold">Me</p>
                <p className="mt-1">{message.content}</p>
              </div>
            );
          }
        })}
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
    </>
  );
}
