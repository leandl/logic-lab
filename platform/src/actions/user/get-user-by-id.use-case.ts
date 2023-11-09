"use server";

import { GetUserByIdUseCase } from "@/application/user/get-user-by-id.use-case";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user.repository";

import { convertEitherToEitherJSON } from "@/utils/patterns";

export async function getUserById(userId: number) {
  const prismaUserRepository = new PrismaUserRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(prismaUserRepository);
  return getUserByIdUseCase.execute(userId);
}

export async function wrapperGetUserByIdServerToClient(
  ...arags: Parameters<typeof getUserById>
) {
  const ressult = await getUserById(...arags);
  return convertEitherToEitherJSON(ressult);
}
