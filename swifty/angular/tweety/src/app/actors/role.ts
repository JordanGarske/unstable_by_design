import { RoleToChannel } from "./role-to-channel";
import { User } from "./user";

export interface Role {
  RoleID: number;
  Name: string;
  Description: string;
  Color: string;
  ProjectID: number;
}