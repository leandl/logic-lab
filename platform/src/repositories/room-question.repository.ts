import { Language } from "@/entities/languange";

export type RoomQuestion = {
  userId: number;
  username: string;
  questionId: number;
  questionName: string;
  roomId: number;
  roomName: string;
  language: Language;
  languageId: number;
  code: string;
  passed: boolean;
};
export type RoomQuestionCreate = {
  userId: number;
  questionId: number;
  roomId: number;
  languageId: number;
  code: string;
};

export type RoomQuestionUpdate = {
  userId: number;
  questionId: number;
  roomId: number;
  languageId: number;
  code: string;
  passed: boolean;
};

export interface RoomQuestionRepository {
  get(
    userId: number,
    roomId: number,
    questionId: number,
    languageId: number
  ): Promise<RoomQuestion | null>;
  create(data: RoomQuestionCreate): Promise<RoomQuestion>;
  update(data: RoomQuestionUpdate): Promise<RoomQuestion>;
}
