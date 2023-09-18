import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany({
    where: {
      supervisor: {
        isNot: null,
      },
    },
  });

  const questions = await prisma.question.findMany();

  return NextResponse.json({ users, questions });
}
