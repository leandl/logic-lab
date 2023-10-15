"use server";

import { CreateLanguageUseCase } from "@/application/language/create-language.use-case";
import { PrismaLanguageRepository } from "@/repositories/prisma/prisma-language.repository";
import { LanguageCreate } from "@/repositories/language.repository";

import { convertEitherToEitherJSON } from "@/utils/patterns";

export async function createLanguage(newLanguage: LanguageCreate) {
  const prismaLanguageRepository = new PrismaLanguageRepository();
  const createLanguageUseCase = new CreateLanguageUseCase(
    prismaLanguageRepository
  );
  return createLanguageUseCase.execute(newLanguage);
}

export async function wrapperCreateLanguageServerToClient(
  ...arags: Parameters<typeof createLanguage>
) {
  const ressult = await createLanguage(...arags);
  return convertEitherToEitherJSON(ressult);
}
