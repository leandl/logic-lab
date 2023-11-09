import { User, UserRepository } from "@/repositories/user.repository";
import { Either, Left, Right } from "@/utils/patterns";

export enum GetUserUseCaseError {
  ID_INVALID = "USER_ID_INVALID",
}

type GetUserByIdInput = number;

type GetUserByIdOutput = User;

export class GetUserByIdUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(
    input: GetUserByIdInput
  ): Promise<Either<GetUserUseCaseError, GetUserByIdOutput>> {
    const userId = input;
    const user = await this.userRepo.findById(userId);

    if (!user) {
      return Left.create(GetUserUseCaseError.ID_INVALID);
    }

    return Right.create(user);
  }
}
