"use server";

import { Either, convertEitherToEitherJSON } from "@/utils/patterns";
import { PrismaRoomQuestionRepository } from "@/repositories/prisma/prisma-room-question.repository";
import { getUserById } from "../user/get-user-by-id.use-case";
import { getRoomById } from "../room/get-user-by-id.use-case";
import { GetUserUseCaseError } from "@/application/user/get-user-by-id.use-case";
import { GetRoomUseCaseError } from "@/application/room/get-room-by-id.use-case";
import {
  GetListAllByUserAndRoomByIdOutput,
  GetListAllByUserAndRoomByIdUseCase,
  GetListAllByUserAndRoomUseCaseError,
} from "@/application/question/get-list-question-by-user-and-room.use-case";

export async function getListAllByUserAndRoom(
  userId: number,
  roomId: number
): Promise<
  Either<
    | GetUserUseCaseError
    | GetRoomUseCaseError
    | GetListAllByUserAndRoomUseCaseError,
    GetListAllByUserAndRoomByIdOutput
  >
> {
  const resultUser = await getUserById(userId);
  if (resultUser.isLeft()) {
    return resultUser;
  }

  const resultRoom = await getRoomById(roomId);
  if (resultRoom.isLeft()) {
    return resultRoom;
  }

  const user = resultUser.value;
  const room = resultRoom.value;

  const roomQuestionRepository = new PrismaRoomQuestionRepository();
  const getListAllByUserAndRoomUseCase = new GetListAllByUserAndRoomByIdUseCase(
    roomQuestionRepository
  );

  return await getListAllByUserAndRoomUseCase.execute({
    user,
    room,
  });
}

export async function wrapperGetListAllByUserAndRoomServerToClient(
  ...arags: Parameters<typeof getListAllByUserAndRoom>
) {
  const ressult = await getListAllByUserAndRoom(...arags);
  return convertEitherToEitherJSON(ressult);
}
