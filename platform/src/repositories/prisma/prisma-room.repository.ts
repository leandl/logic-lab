import { prisma } from "@/lib/prisma";
import { Room as PrismaRoom } from "@prisma/client";
import {
  Room,
  RoomCreate,
  RoomRepository,
} from "@/repositories/room.repository";

function convertPrismaRoomToRoom(room: PrismaRoom): Room {
  return {
    id: room.id,
    name: room.name,
    active: room.active,
  };
}

export class PrismaRoomRepository implements RoomRepository {
  async findById(roomId: number): Promise<Room | null> {
    const room = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });

    return room && convertPrismaRoomToRoom(room);
  }

  async findByName(roomName: string): Promise<Room | null> {
    const room = await prisma.room.findFirst({
      where: {
        name: roomName,
      },
    });

    return room && convertPrismaRoomToRoom(room);
  }

  async create(newRoom: RoomCreate): Promise<Room> {
    const room = await prisma.room.create({
      data: {
        name: newRoom.name,
        active: true,
      },
    });

    return room && convertPrismaRoomToRoom(room);
  }

  async addSupervisors(roomId: number, userIDs: number[]): Promise<void> {
    await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        supervisors: {
          connect: userIDs.map((userId) => ({
            userId: userId,
          })),
        },
      },
    });
  }

  async addUsers(roomId: number, userIDs: number[]): Promise<void> {
    await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        userRooms: {
          deleteMany: {
            AND: {
              roomId: roomId,
              userId: {
                in: userIDs,
              },
            },
          },
          create: userIDs.map((userId) => ({
            userId: userId,
          })),
        },
      },
    });
  }

  async addQuestions(roomId: number, questionIDs: number[]): Promise<void> {
    await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        questions: {
          connect: questionIDs.map((questionId) => ({
            id: questionId,
          })),
        },
      },
    });
  }
}
