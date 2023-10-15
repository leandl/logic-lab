export type Room = {
  id: number;
  name: string;
  active: boolean;
};

export type RoomCreate = {
  name: string;
};

export interface RoomRepository {
  findById(roomId: number): Promise<Room | null>;
  findByName(roomName: string): Promise<Room | null>;
  create(room: RoomCreate): Promise<Room>;
  addSupervisors(roomId: number, userIDs: number[]): Promise<void>;
  addUsers(roomId: number, userIDs: number[]): Promise<void>;
  addQuestions(roomId: number, questionIDs: number[]): Promise<void>;
}
