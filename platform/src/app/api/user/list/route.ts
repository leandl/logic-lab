import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { NextResponse } from "next/server";

export async function GET() {
  const userRepository = new PrismaUserRepository();
  const users = await userRepository.getAll();

  return NextResponse.json(users, { status: 200 });
}
