import { Language as LanguageSystem } from "@/entities/languange";
import { prisma } from "@/lib/prisma";
import { Language as PrismaLanguage } from "@prisma/client";
import {
  Language,
  LanguageCreate,
  LanguageRepository,
} from "@/repositories/language.repository";

function convertPrismaLanguageToLanguage(language: PrismaLanguage): Language {
  return {
    id: language.id,
    name: language.name as LanguageSystem,
  };
}

export class PrismaLanguageRepository implements LanguageRepository {
  async findById(languageId: number): Promise<Language | null> {
    const language = await prisma.language.findUnique({
      where: {
        id: languageId,
      },
    });

    return language && convertPrismaLanguageToLanguage(language);
  }

  async findByName(languageName: string): Promise<Language | null> {
    const language = await prisma.language.findFirst({
      where: {
        name: languageName,
      },
    });

    return language && convertPrismaLanguageToLanguage(language);
  }

  async getAll(): Promise<Language[]> {
    const categories = await prisma.language.findMany();
    return categories.map(convertPrismaLanguageToLanguage);
  }

  async create(newLanguage: LanguageCreate): Promise<Language> {
    const language = await prisma.language.create({
      data: { name: newLanguage.name },
    });

    return language && convertPrismaLanguageToLanguage(language);
  }
}
