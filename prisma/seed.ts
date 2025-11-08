import { prisma } from "@/lib/prisma";

async function main() {
  // await prisma.task.deleteMany();

  // await prisma.task.createMany({
  //   data: [
  //     { title: "Learn Next.js", done: false, priority: 1 },
  //     { title: "Study Prisma", done: true, priority: 2 },
  //     { title: "Build Task Tracker", done: false, priority: 3 },
  //   ],
  // });

  console.log("✅ Database seeded!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
