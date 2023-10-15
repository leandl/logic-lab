import {
  RoomRepository,
  Room,
  RoomCreate,
} from "@/repositories/room.repository";
import { Either, Left, Right } from "@/utils/patterns";

export enum CreateRoomUseCaseError {
  NAME_ROOM_IN_USE = "NAME_ROOM_IN_USE",
}

type CreateRoomInput = RoomCreate & {
  supervisorId: number;
};

type CreateRoomOutput = Room;

export class CreateRoomUseCase {
  constructor(private roomRepo: RoomRepository) {}

  async execute(
    input: CreateRoomInput
  ): Promise<Either<CreateRoomUseCaseError, CreateRoomOutput>> {
    const roomExists = await this.roomRepo.findByName(input.name);
    const isRoomUsing = Boolean(roomExists);

    if (isRoomUsing) {
      return Left.create(CreateRoomUseCaseError.NAME_ROOM_IN_USE);
    }

    const newRoom = await this.roomRepo.create({ name: input.name });
    await this.roomRepo.addSupervisors(newRoom.id, [input.supervisorId]);
    await this.roomRepo.addUsers(newRoom.id, [input.supervisorId]);

    return Right.create(newRoom);
  }
}
