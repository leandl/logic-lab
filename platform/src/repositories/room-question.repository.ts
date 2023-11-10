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

export type AllRoomQuestionOfUser = {
  id: number;
  name: string;
  questions: {
    id: number;
    name: string;
    category: string;
    passed: boolean;
  }[];
};

export interface RoomQuestionRepository {
  create(data: RoomQuestionCreate): Promise<RoomQuestion>;
  update(data: RoomQuestionUpdate): Promise<RoomQuestion>;
  getOfUser(
    userId: number,
    roomId: number,
    questionId: number,
    languageId: number
  ): Promise<RoomQuestion | null>;
  getAllOfUser(
    userId: number,
    roomId: number,
    languageId: number
  ): Promise<AllRoomQuestionOfUser | null>;
}
