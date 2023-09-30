"use server";

import { CreateSupervisorUseCase } from "@/application/supervisor/create-supervisor.use-case";
import { PrismaSupervisorRepository } from "@/repositories/prisma/prisma-supervisor.repository";
import { UserCreate } from "@/repositories/user.repository";
import { convertEitherToEitherJSON } from "@/utils/patterns";
import { createUser } from "../user/create-user.action";

export async function createSupervisor(newUser: UserCreate) {
  const ressult = await createUser(newUser);

  if (ressult.isLeft()) {
    return ressult;
  }

  const user = ressult.value;
  const prismaSupervisorRepository = new PrismaSupervisorRepository();
  const createSupervisorUseCase = new CreateSupervisorUseCase(
    prismaSupervisorRepository
  );
  return createSupervisorUseCase.execute(user);
}

export async function wrapperCreateSupervisorServerToClient(
  ...arags: Parameters<typeof createSupervisor>
) {
  const ressult = await createSupervisor(...arags);
  return convertEitherToEitherJSON(ressult);
}
