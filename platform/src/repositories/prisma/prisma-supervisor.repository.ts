import { prisma } from "@/lib/prisma";
import { Supervisor, SupervisorRepository } from "../supervisor.repository";
import { User } from "../user.repository";

export class PrismaSupervisorRepository implements SupervisorRepository {
  async create(userRaw: User): Promise<Supervisor> {
    const supervisor = await prisma.supervisor.create({
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
          },
        },
      },
      data: {
        userId: userRaw.id,
      },
    });

    return {
      id: supervisor.id,
      type: "supervisor",
      userId: supervisor.user.id,
      name: supervisor.user.name,
      email: supervisor.user.email,
    };
  }

  async getById(userId: number): Promise<Supervisor | null> {
    const supervisor = await prisma.supervisor.findUnique({
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
          },
        },
      },
      where: {
        userId: userId,
      },
    });

    return (
      supervisor && {
        id: supervisor.id,
        type: "supervisor",
        userId: supervisor.user.id,
        name: supervisor.user.name,
        email: supervisor.user.email,
      }
    );
  }

  async findByEmail(email: string): Promise<Supervisor | null> {
    const supervisor = await prisma.supervisor.findFirst({
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
          },
        },
      },
      where: {
        user: {
          email: email,
        },
      },
    });

    return (
      supervisor && {
        id: supervisor.id,
        type: "supervisor",
        userId: supervisor.user.id,
        name: supervisor.user.name,
        email: supervisor.user.email,
      }
    );
  }
}
