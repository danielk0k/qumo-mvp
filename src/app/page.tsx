import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NewStudyDialog from "@/components/new-study-dialog";
import supabaseClient from "@/lib/supabaseClient";

export default async function ResearchDashboard() {
  const { data } = await supabaseClient.from("research_collection").select();
  return (
    <main className="flex flex-col mx-auto max-w-4xl justify-center p-2">
      <Card>
        <CardHeader className="flex-row justify-between">
          <div className="space-y-1.5">
            <CardTitle>Research Dashboard</CardTitle>
            <CardDescription>
              Create new studies or download the responses from existing ones
            </CardDescription>
          </div>
          <NewStudyDialog></NewStudyDialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Link</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.research_name}</TableCell>
                  <TableCell>{row.research_description}</TableCell>
                  <TableCell>{row.research_id}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline">Download</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
