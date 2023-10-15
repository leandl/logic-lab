import { prisma } from "@/lib/prisma";
import { Supervisor, SupervisorRepository } from "../supervisor.repository";
import { User } from "../user.repository";

export class PrismaSupervisorRepository implements SupervisorRepository {
  async create(userRaw: User): Promise<Supervisor> {
    await prisma.supervisor.create({
      data: {
        userId: userRaw.id,
      },
    });

    return {
      ...userRaw,
      type: "supervisor",
    };
  }

  async getById(userId: number): Promise<Supervisor | null> {
    const user = await prisma.user.findFirst({
      where: {
        AND: {
          id: userId,
          supervisor: {
            isNot: null,
          },
        },
      },
    });

    return (
      user && {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        type: "supervisor",
      }
    );
  }
}
