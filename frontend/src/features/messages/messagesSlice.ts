import { createSlice } from '@reduxjs/toolkit';
import { Message } from '../../app/types';
import { RootState } from '../../app/store.ts';
import { createMessage, fetchMessages } from './messagesThunks.ts';

interface MessagesState {
  messages: Message[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: MessagesState = {
  messages: [],
  fetchLoading: false,
  createLoading: false,
};

export const selectMessages = (state: RootState) => state.messages.messages;
export const selectFetchLoading = (state: RootState) => state.messages.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.messages.createLoading;

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, { payload: messages }) => {
        state.fetchLoading = false;
        state.messages = messages;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.fetchLoading = false;
      })
      .addCase(createMessage.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createMessage.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createMessage.rejected, (state) => {
        state.createLoading = false;
      });
  }

});

export const messagesReducer = messagesSlice.reducer;