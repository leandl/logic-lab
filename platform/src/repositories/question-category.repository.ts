export type QuestionCategory = {
  id: number;
  name: string;
};

export type QuestionCategoryCreate = {
  name: string;
};

export interface QuestionCategoryRepository {
  findById(categoryId: number): Promise<QuestionCategory | null>;
  findByName(categoryName: string): Promise<QuestionCategory | null>;
  getAll(): Promise<QuestionCategory[]>;
  create(category: QuestionCategoryCreate): Promise<QuestionCategory>;
}
