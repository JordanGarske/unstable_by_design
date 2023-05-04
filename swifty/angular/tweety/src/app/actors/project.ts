import { Channel } from "./channel";
import { Role } from "./role";
import { Status } from "./status";

export interface Project {
  ProjectID: number;
  Name: string;
  Description: string;
  Color: string;
  Roles: number[];
  Statuses: number[];
}