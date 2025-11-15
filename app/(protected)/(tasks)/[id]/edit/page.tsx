import { notFound } from "next/navigation";
import { getSingleTask } from "../../actions";

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
const EditSingleTask = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const task = await getSingleTask(id);
  if (!task) notFound();

  return (
    <main className="space-y-4 p-6">
      <h1 className="text-4xl">Edit Task: {task.title}</h1>
      <p>{task.description}</p>
      <p className="text-xl">{task.done ? "Done" : "Open"}</p>
    </main>
  );
};

export default EditSingleTask;
