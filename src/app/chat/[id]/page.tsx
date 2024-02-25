import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Chat from "@/components/chat";
import supabaseClient from "@/lib/supabaseClient";

export default async function ChatView({ params }: { params: { id: string } }) {
  const { data } = await supabaseClient
    .from("research_collection")
    .select("research_id, research_name, research_description")
    .eq("research_id", params.id);
  return (
    <main className="flex flex-col mx-auto max-w-2xl justify-center p-4">
      <Card>
        <CardHeader>
          <CardTitle>{data ? data[0]?.research_name : ""}</CardTitle>
          <CardDescription>
            {data ? data[0]?.research_description : ""}
          </CardDescription>
        </CardHeader>
        <Chat id={params.id}></Chat>
      </Card>
    </main>
  );
}
