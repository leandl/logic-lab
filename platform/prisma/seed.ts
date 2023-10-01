import { createSupervisor } from "@/actions/supervisor/create-supervisor.action";
import { prisma } from "@/lib/prisma";

async function main() {
  const result = await createSupervisor({
    email: "leandro@email.com",
    name: "Leandro",
    password: "123456",
  });

  if (result.isLeft()) {
    throw Error(result.error);
  }
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
