import { Status } from "../status";

export const mockStatuses: Status[] = [
    {
      StatusID: 1,
      Name: 'To Do',
      Description: 'Task has not been started',
      ProjectID: 1
    },
    {
      StatusID: 2,
      Name: 'In Progress',
      Description: 'Task is currently being worked on',
      ProjectID: 1
    }
];