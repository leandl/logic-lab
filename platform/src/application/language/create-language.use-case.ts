import {
  LanguageRepository,
  Language,
  LanguageCreate,
} from "@/repositories/language.repository";
import { Either, Left, Right } from "@/utils/patterns";

export enum CreateLanguageUseCaseError {
  NAME_LANGUAGE_IN_USE = "NAME_LANGUAGE_IN_USE",
}

type CreateLanguageInput = LanguageCreate;

type CreateLanguageOutput = Language;

export class CreateLanguageUseCase {
  constructor(private languageRepo: LanguageRepository) {}

  async execute(
    input: CreateLanguageInput
  ): Promise<Either<CreateLanguageUseCaseError, CreateLanguageOutput>> {
    const languageExists = await this.languageRepo.findByName(input.name);
    const isLanguageUsing = Boolean(languageExists);

    if (isLanguageUsing) {
      return Left.create(CreateLanguageUseCaseError.NAME_LANGUAGE_IN_USE);
    }

    const newLanguage = await this.languageRepo.create(input);
    return Right.create(newLanguage);
  }
}
