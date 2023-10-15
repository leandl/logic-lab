import { User } from "./user.repository";

export type Supervisor = User & { type: "supervisor" };

export interface SupervisorRepository {
  create(user: User): Promise<Supervisor>;
  getById(userId: number): Promise<Supervisor | null>;
}
