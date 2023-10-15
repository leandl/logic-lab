import { createLanguage } from "@/actions/language/create-language.action";
import { createRoom } from "@/actions/room/create-room.action";
import { createSupervisor } from "@/actions/supervisor/create-supervisor.action";
import { CreateLanguageUseCaseError } from "@/application/language/create-language.use-case";
import { CreateRoomUseCaseError } from "@/application/room/create-room.use-case";
import { CreateUserUseCaseError } from "@/application/user/create-user.use-case";
import { GLOBAL_ROOM } from "@/config/rules";
import { Language } from "@/entities/languange";
import { prisma } from "@/lib/prisma";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user.repository";

async function main() {
  const resultSupervisor = await createSupervisor({
    email: "leandro@email.com",
    name: "Leandro",
    password: "123456",
  });

  if (
    resultSupervisor.isLeft() &&
    resultSupervisor.error !== CreateUserUseCaseError.EMAIL_USER_IN_USE
  ) {
    throw Error(resultSupervisor.error);
  }

  const resultLanguage = await createLanguage({
    name: Language.PYTHON,
  });

  if (
    resultLanguage.isLeft() &&
    resultLanguage.error !== CreateLanguageUseCaseError.NAME_LANGUAGE_IN_USE
  ) {
    throw Error(resultLanguage.error);
  }

  const prismaUserRepository = new PrismaUserRepository();
  const supervisor = await prismaUserRepository.findByEmail(
    "leandro@email.com"
  );

  const ressultRoom = await createRoom({
    name: GLOBAL_ROOM,
    supervisorId: supervisor!.id,
  });

  if (
    ressultRoom.isLeft() &&
    ressultRoom.error !== CreateRoomUseCaseError.NAME_ROOM_IN_USE
  ) {
    throw Error(ressultRoom.error);
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
