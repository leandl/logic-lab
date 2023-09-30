import { hash } from "bcryptjs";

import { prisma } from "@/lib/prisma";
import {
  User,
  UserCreate,
  UserRepository,
} from "@/repositories/user.repository";

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
          id: user.id,
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
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        };
  }

  async create(userCreate: UserCreate): Promise<User> {
    const password = await hash(userCreate.password, 8);
    const user = await prisma.user.create({
      data: {
        ...userCreate,
        password,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
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
