import { Message } from "./message";
import { Role } from "./role";
import { Task } from "./task";

export interface User {
  UserID: number;
  Username: string;
  Password: string;
  Roles: Role[];
  Authored_Tasks: Task[];
  Tasks: Task[];
  Messages: Message[];
}