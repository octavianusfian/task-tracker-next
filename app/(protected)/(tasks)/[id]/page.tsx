import { notFound } from "next/navigation";
import { getSingleTask } from "../actions";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const task = await getSingleTask(id);

  if (!task) return { title: "Task not founds" };

  return {
    title: `${task.title} | Task Tracker`,
    openGraph: {
      title: task.title,
      description: task.description,
      url: "https://task-tracker-next-chi.vercel.app/" + task.id,
      //   images: ["https://myapp.com/og-image.png"],
    },
  };
};

const SingeTask = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const task = await getSingleTask(id);
  if (!task) notFound();

  return (
    <main className="space-y-4 p-6">
      <h1 className="text-4xl">{task.title}</h1>
      <p>{task.description}</p>
      <p className="text-xl">{task.done ? "Done" : "Open"}</p>
      <Link href={`/${task.id}/edit`}>
        <Button>Edit Task</Button>
      </Link>
    </main>
  );
};

export default SingeTask;
