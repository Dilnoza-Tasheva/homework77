import { createAsyncThunk } from '@reduxjs/toolkit';
import { Message, MessageMutation } from '../../app/types';
import axiosApi from '../../axiosApi.ts';

export const fetchMessages = createAsyncThunk<Message[], void>(
  'messages/fetchMessages',
  async () => {
    const messagesResponse = await axiosApi<Message[]>('/messages');
    return messagesResponse.data || [];
  }
);

export const createMessage = createAsyncThunk<Message, MessageMutation>(
  'messages/createMessage',
  async (messageMutation) => {
    const formData = new FormData();

    const keys = Object.keys(messageMutation) as (keyof MessageMutation)[];

    keys.forEach(key => {
      const value = messageMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

     const response = await axiosApi.post('/messages', formData)
    return response.data as Message;
  }
);