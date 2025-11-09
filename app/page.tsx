import Link from "next/link";



export default async function Home() {


  return (
    <main className="space-y-3 flex items-center justify-center min-h-screen text-white font-semibold">
     <Link href={"/tasks"} className="bg-blue-500 p-2">Go to Task</Link>
    </main>
  );
}
