"use server";

import { CreateUserUseCase } from "@/application/user/create-user.use-case";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user.repository";
import { UserCreate } from "@/repositories/user.repository";
import { convertEitherToEitherJSON } from "@/utils/patterns";

export async function createUser(newUser: UserCreate) {
  const prismaUserRepository = new PrismaUserRepository();
  const createUserUseCase = new CreateUserUseCase(prismaUserRepository);
  return createUserUseCase.execute(newUser);
}

export async function wrapperCreateUserServerToClient(
  ...arags: Parameters<typeof createUser>
) {
  const ressult = await createUser(...arags);
  return convertEitherToEitherJSON(ressult);
}
