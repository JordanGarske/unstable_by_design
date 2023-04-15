import { Message } from "../message";

export const mockMessages: Message[] = [
    {
      MessageID: 1,
      AuthorID: 1,
      ChannelID: 1,
      MessageContent: 'Hello, world!'
    },
    {
      MessageID: 2,
      AuthorID: 2,
      ChannelID: 1,
      MessageContent: 'How are you doing?'
    },
    {
      MessageID: 3,
      AuthorID: 1,
      ChannelID: 2,
      MessageContent: 'I am doing well, thanks!'
    }
  ];