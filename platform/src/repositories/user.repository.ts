export type UserCreate = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export interface UserRepository {
  findById(userId: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  getAll(): Promise<User[]>;
  create(user: UserCreate): Promise<User>;
  changeName(userId: number, newName: string): Promise<void>;
  changePassword(userId: number, newPassword: string): Promise<void>;
}
