"use server";

import { ListAllUsersUseCase } from "@/application/user/list-all-users.use-case";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user.repository";

import { convertEitherToEitherJSON } from "@/utils/patterns";

export async function listAllUsers() {
  const prismaUserRepository = new PrismaUserRepository();

  const listAllUsersUseCase = new ListAllUsersUseCase(prismaUserRepository);
  return listAllUsersUseCase.execute();
}

export async function wrapperListAllUsersServerToClient(
  ...arags: Parameters<typeof listAllUsers>
) {
  const ressult = await listAllUsers(...arags);
  return convertEitherToEitherJSON(ressult);
}
