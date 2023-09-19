import { NextResponse } from "next/server";
import { z } from "zod";

import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";

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

export async function POST(request: Request, response: Response) {
  const req = await request.json();
  const userRepository = new PrismaUserRepository();
  const result = validatorCreateUser.safeParse(req.body);

  if (!result.success) {
    return NextResponse.json(
      {
        fieldsInvalid: result.error.errors.map((error) => error.message),
      },
      { status: 404 }
    );
  }

  const newUser = result.data;
  const userExists = await userRepository.findByEmail(newUser.email);
  const isEmailUsing = Boolean(userExists);

  if (isEmailUsing) {
    return NextResponse.json(
      {
        message: "Este e-mail já esta sendo utlizado.",
      },
      { status: 409 }
    );
  }

  const user = await userRepository.create(newUser);
  return NextResponse.json(user, { status: 201 });
}
