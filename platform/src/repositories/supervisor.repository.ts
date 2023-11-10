import { User } from "./user.repository";

export type Supervisor = {
  id: number;
  name: string;
  email: string;
  userId: number;
  type: "supervisor";
};

export interface SupervisorRepository {
  create(user: User): Promise<Supervisor>;
  getById(userId: number): Promise<Supervisor | null>;
  findByEmail(email: string): Promise<Supervisor | null>;
}
