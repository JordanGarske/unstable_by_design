export interface Project {
    ProjectID: number;
    Name: string;
    Description: string;
    Color: string;
  }
  
  export interface Role {
    RoleID: number;
    Name: string;
    Description: string;
    Color: string;
    ProjectID: number;
  }
  
  export interface Channel {
    ChannelID: number;
    ProjectID: number;
    Name: string;
    Description: string;
    Color: string;
  }
  
  export interface RoleToChannel {
    ChannelID: number;
    RoleID: number;
    Create: boolean;
    Read: boolean;
    Update: boolean;
    Delete: boolean;
  }
  
  export interface User {
    UserID: number;
    Username: string;
    Password: string;
  }
  
  export interface Message {
    MessageID: number;
    AuthorID: number;
    ChannelID: number;
    MessageContent: string;
  }
  
  export interface Status {
    StatusID: number;
    Name: string;
    Description: string;
    ProjectID: number;
  }
  
  export interface Task {
    TaskID: number;
    Name: string;
    Description: string;
    StatusID: number;
    AuthorID: number;
  }
  