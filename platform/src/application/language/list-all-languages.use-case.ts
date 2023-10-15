import {
  Language,
  LanguageRepository,
} from "@/repositories/language.repository";
import { Either, Right } from "@/utils/patterns";

type ListAllLanguageOutput = Language[];

export class ListAllLanguageUseCase {
  constructor(private languageRepo: LanguageRepository) {}

  async execute(): Promise<Either<never, ListAllLanguageOutput>> {
    const languages = await this.languageRepo.getAll();
    return Right.create(languages);
  }
}
