import { Room, RoomRepository } from "@/repositories/room.repository";
import { Either, Left, Right } from "@/utils/patterns";

export enum GetRoomUseCaseError {
  ID_INVALID = "ROOM_ID_INVALID",
}

type GetRoomByIdInput = number;

type GetRoomByIdOutput = Room;

export class GetRoomByIdUseCase {
  constructor(private roomRepo: RoomRepository) {}

  async execute(
    input: GetRoomByIdInput
  ): Promise<Either<GetRoomUseCaseError, GetRoomByIdOutput>> {
    const roomId = input;
    const room = await this.roomRepo.findById(roomId);

    if (!room) {
      return Left.create(GetRoomUseCaseError.ID_INVALID);
    }

    return Right.create(room);
  }
}
