import { NextResponse } from "next/server";
import { z } from "zod";

import { PrismaUserRepository } from "@/repositories/prisma/prisma-user.repository";
import {
  CreateUserUseCase,
  CreateUserUseCaseError,
} from "@/application/user/create-user.use-case";

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
  const result = validatorCreateUser.safeParse(req.body);
  if (!result.success) {
    return NextResponse.json(
      {
        fieldsInvalid: result.error.errors.map((error) => error.message),
      },
      { status: 400 }
    );
  }

  const newUser = result.data;
  const userRepository = new PrismaUserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const resultCreate = await createUserUseCase.execute(newUser);

  if (resultCreate.isRight()) {
    const user = resultCreate.value;
    return NextResponse.json(user, { status: 201 });
  }

  const error = resultCreate.error;
  if (error === CreateUserUseCaseError.EMAIL_IN_USE) {
    return NextResponse.json(
      {
        message: "Este e-mail já esta sendo utlizado.",
      },
      { status: 409 }
    );
  }
}
