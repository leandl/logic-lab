import { UserRepository } from "@/repositories/user.repository";
import { Either, Left, Right } from "@/utils/patterns";

export enum CreateUserUseCaseError {
  EMAIL_IN_USE = "EMAIL_IN_USE",
}

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

type CreateUserOutput = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(
    input: CreateUserInput
  ): Promise<Either<CreateUserUseCaseError, CreateUserOutput>> {
    const userExists = await this.userRepo.findByEmail(input.email);
    const isEmailUsing = Boolean(userExists);

    if (isEmailUsing) {
      return Left.create(CreateUserUseCaseError.EMAIL_IN_USE);
    }

    const newUser = await this.userRepo.create(input);
    return Right.create(newUser);
  }
}
