import {
  Supervisor,
  SupervisorRepository,
} from "@/repositories/supervisor.repository";
import { User } from "@/repositories/user.repository";
import { Either, Right } from "@/utils/patterns";

type CreateSupervisorInput = User;
type CreateSupervisorOutput = Supervisor;

export class CreateSupervisorUseCase {
  constructor(private supervisorRepo: SupervisorRepository) {}

  async execute(
    input: CreateSupervisorInput
  ): Promise<Either<never, CreateSupervisorOutput>> {
    const newSupervisor = await this.supervisorRepo.create(input);
    return Right.create(newSupervisor);
  }
}
