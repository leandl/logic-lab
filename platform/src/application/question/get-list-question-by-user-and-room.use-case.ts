import { LANGUAGE_PYTHON_ID } from "@/config/rules";
import {
  AllRoomQuestionOfUser,
  RoomQuestionRepository,
} from "@/repositories/room-question.repository";
import { Room } from "@/repositories/room.repository";
import { User } from "@/repositories/user.repository";
import { Either, Left, Right } from "@/utils/patterns";

export enum GetListAllByUserAndRoomUseCaseError {
  ID_INVALID = "USER_AND_ROOM_ID_INVALID",
}

type GetListAllByUserAndRoomByIdInput = {
  user: User;
  room: Room;
};

export type GetListAllByUserAndRoomByIdOutput = AllRoomQuestionOfUser;

export class GetListAllByUserAndRoomByIdUseCase {
  constructor(private roomQuestionRepository: RoomQuestionRepository) {}

  async execute(
    input: GetListAllByUserAndRoomByIdInput
  ): Promise<
    Either<
      GetListAllByUserAndRoomUseCaseError,
      GetListAllByUserAndRoomByIdOutput
    >
  > {
    const { user, room } = input;
    const roomQuestions = await this.roomQuestionRepository.getAllOfUser(
      user.id,
      room.id,
      LANGUAGE_PYTHON_ID
    );

    if (!roomQuestions) {
      return Left.create(GetListAllByUserAndRoomUseCaseError.ID_INVALID);
    }

    return Right.create(roomQuestions);
  }
}
