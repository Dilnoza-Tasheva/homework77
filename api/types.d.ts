export interface Message {
    id: string;
    author: string | null;
    message: string;
    image: string | null;
}

export type MessageWithoutID = Omit<Message, 'id'>