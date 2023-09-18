import { prisma } from "../../lib/prisma";
import { User, UserRepository } from "../user-repository";

export class PrismaUserRepository implements UserRepository {
  async getAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  async findById(userId: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return !user
      ? null
      : {
          name: user.name,
          email: user.email,
          password: user.password,
        };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return !user
      ? null
      : {
          name: user.name,
          email: user.email,
          password: user.password,
        };
  }

  async create(user: User): Promise<User> {
    await prisma.user.create({
      data: user,
    });
    return user;
  }

  async changePassword(userId: number, newPassword: string): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
      },
    });
  }

  async changeName(userId: number, newName: string): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: newName,
      },
    });
  }
}
