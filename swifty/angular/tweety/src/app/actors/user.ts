import { Message } from "./message";
import { Role } from "./role";
import { Task } from "./task";

export interface User {
  UserID: number;
  Username: string;
  Password: string;
  Roles: number[];
  Authored_Tasks: number[];
  Tasks: number[];
  Messages: number[];
}