"use server";

import { ListAllLanguageUseCase } from "@/application/language/list-all-languages.use-case";
import { PrismaLanguageRepository } from "@/repositories/prisma/prisma-language.repository";

import { convertEitherToEitherJSON } from "@/utils/patterns";

export async function listAllLanguage() {
  const prismaLanguageRepository = new PrismaLanguageRepository();

  const listAllLanguageUseCase = new ListAllLanguageUseCase(
    prismaLanguageRepository
  );
  return listAllLanguageUseCase.execute();
}

export async function wrapperListAllLanguageServerToClient(
  ...arags: Parameters<typeof listAllLanguage>
) {
  const ressult = await listAllLanguage(...arags);
  return convertEitherToEitherJSON(ressult);
}
