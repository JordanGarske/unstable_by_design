import { RoleToChannel } from "../role-to-channel";

export const mockRoleToChannels: RoleToChannel[] = [
    {
      ChannelID: 1,
      RoleID: 1,
      Create: true,
      Read: true,
      Update: true,
      Delete: true
    },
    {
      ChannelID: 2,
      RoleID: 2,
      Create: false,
      Read: true,
      Update: false,
      Delete: true
    },
    {
      ChannelID: 3,
      RoleID: 3,
      Create: true,
      Read: true,
      Update: true,
      Delete: false
    }
  ];