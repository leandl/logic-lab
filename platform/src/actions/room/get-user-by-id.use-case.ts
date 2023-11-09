"use server";

import { GetRoomByIdUseCase } from "@/application/room/get-room-by-id.use-case";
import { PrismaRoomRepository } from "@/repositories/prisma/prisma-room.repository";

import { convertEitherToEitherJSON } from "@/utils/patterns";

export async function getRoomById(roomId: number) {
  const prismaRoomRepository = new PrismaRoomRepository();
  const getRoomByIdUseCase = new GetRoomByIdUseCase(prismaRoomRepository);
  return getRoomByIdUseCase.execute(roomId);
}

export async function wrapperGetRoomByIdServerToClient(
  ...arags: Parameters<typeof getRoomById>
) {
  const ressult = await getRoomById(...arags);
  return convertEitherToEitherJSON(ressult);
}
