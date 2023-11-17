import { User, UserRepository } from "@/repositories/user.repository";
import { Either, Right } from "@/utils/patterns";

type ListAllUsersOutput = User[];

export class ListAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<Either<never, ListAllUsersOutput>> {
    const categories = await this.userRepository.getAll();
    return Right.create(categories);
  }
}
