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
}
