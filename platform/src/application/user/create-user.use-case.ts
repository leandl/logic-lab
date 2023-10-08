import {
  User,
  UserCreate,
  UserRepository,
} from "@/repositories/user.repository";
import { Either, Left, Right } from "@/utils/patterns";

export enum CreateUserUseCaseError {
  EMAIL_USER_IN_USE = "EMAIL_USER_IN_USE",
}

type CreateUserInput = UserCreate;
type CreateUserOutput = User;

export class CreateUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(
    input: CreateUserInput
  ): Promise<Either<CreateUserUseCaseError, CreateUserOutput>> {
    const userExists = await this.userRepo.findByEmail(input.email);
    const isEmailUsing = Boolean(userExists);

    if (isEmailUsing) {
      return Left.create(CreateUserUseCaseError.EMAIL_USER_IN_USE);
    }

    const newUser = await this.userRepo.create(input);
    return Right.create(newUser);
  }
}
