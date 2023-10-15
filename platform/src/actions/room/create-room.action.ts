"use server";

import { CreateRoomUseCase } from "@/application/room/create-room.use-case";
import { PrismaRoomRepository } from "@/repositories/prisma/prisma-room.repository";
import { RoomCreate } from "@/repositories/room.repository";

import { convertEitherToEitherJSON } from "@/utils/patterns";

type NewRoom = RoomCreate & {
  supervisorId: number;
};

export async function createRoom(newRoom: NewRoom) {
  const prismaRoomRepository = new PrismaRoomRepository();
  const createRoomUseCase = new CreateRoomUseCase(prismaRoomRepository);
  return createRoomUseCase.execute(newRoom);
}

export async function wrapperCreateRoomServerToClient(
  ...arags: Parameters<typeof createRoom>
) {
  const ressult = await createRoom(...arags);
  return convertEitherToEitherJSON(ressult);
}
