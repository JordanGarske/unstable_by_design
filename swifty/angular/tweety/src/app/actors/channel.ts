import { Message } from "./message";
import { RoleToChannel } from "./role-to-channel";

export interface Channel {
  ChannelID: number;
  Name: string;
  Description: string;
  Color: string;
  ProjectID: number;
  Messages: Message[];
  Connections: RoleToChannel[];
}