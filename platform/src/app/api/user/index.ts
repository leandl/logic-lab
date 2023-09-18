import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository";
import { router } from "../../../utils/router";

const validatorCreateUser = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Nome: deve ter um tamanho minimo de 3 caracterios."),
  email: z.string().email("E-mail: deve ser um e-mail valido."),
  password: z
    .string()
    .trim()
    .min(8, "Senha: deve ter um tamanho minimo de 8 caracterios."),
});

async function createUser(request: NextApiRequest, response: NextApiResponse) {
  const userRepository = new PrismaUserRepository();
  const result = validatorCreateUser.safeParse(request.body);

  if (!result.success) {
    return response.status(404).json({
      fieldsInvalid: result.error.errors.map((error) => error.message),
    });
  }

  const newUser = result.data;
  const userExists = await userRepository.findByEmail(newUser.email);
  const isEmailUsing = Boolean(userExists);

  if (isEmailUsing) {
    return response.status(409).json({
      message: "Este e-mail já esta sendo utlizado.",
    });
  }

  const user = await userRepository.create(newUser);

  return response.status(201).json(user);
}

export default router({
  POST: createUser,
});
