export type QuestionCategory = {
  id: number;
  name: string;
};

export type QuestionCategoryCreateDTO = {
  name: string;
};

export interface QuestionCategoryRepository {
  findById(categoryId: number): Promise<QuestionCategory | null>;
  findByName(categoryName: string): Promise<QuestionCategory | null>;
  getAll(): Promise<QuestionCategory[]>;
  create(user: QuestionCategoryCreateDTO): Promise<QuestionCategory>;
}
