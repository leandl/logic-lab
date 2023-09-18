import { NextApiRequest, NextApiResponse } from "next";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository";
import { router } from "../../../utils/router";

async function listUsers(_request: NextApiRequest, response: NextApiResponse) {
  const userRepository = new PrismaUserRepository();
  const users = await userRepository.getAll();

  return response.status(201).json(users);
}

export default router({
  GET: listUsers,
});
