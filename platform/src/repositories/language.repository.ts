import { Language as LanguageSystem } from "@/entities/languange";

export type Language = {
  id: number;
  name: LanguageSystem;
};

export type LanguageCreate = {
  name: LanguageSystem;
};

export interface LanguageRepository {
  findById(languageId: number): Promise<Language | null>;
  findByName(languageName: string): Promise<Language | null>;
  getAll(): Promise<Language[]>;
  create(language: LanguageCreate): Promise<Language>;
}
