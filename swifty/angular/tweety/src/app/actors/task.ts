import { User } from "./user";

export interface Task {
  TaskID: number;
  Name: string;
  Description: string;
  StatusID: number;
  AuthorID: number;
  Collaborators: User[];
}






