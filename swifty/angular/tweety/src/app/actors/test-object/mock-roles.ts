import { Role } from "../role";

export const mockRoles: Role[] = [
    {
      RoleID: 1,
      Name: 'Admin',
      Description: 'Administrator role',
      Color: 'green',
      ProjectID: 1
    },
    {
      RoleID: 2,
      Name: 'User',
      Description: 'Regular user role',
      Color: 'purple',
      ProjectID: 1
    },
    {
      RoleID: 3,
      Name: 'Manager',
      Description: 'Manager role',
      Color: 'orange',
      ProjectID: 2
    }
  ];