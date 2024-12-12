import MessageForm from './components/MesageForm.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectFetchLoading, selectMessages } from './messagesSlice.ts';
import { useEffect } from 'react';
import { fetchMessages } from './messagesThunks.ts';
import Grid from '@mui/material/Grid2';
import { CircularProgress, Typography } from '@mui/material';
import MessageItem from './components/MessageItem.tsx';


const Messages = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const fetchLoading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);
  return (
    <Grid container direction={"column"} spacing={2}>
      <Grid>
        <Typography variant="h4">Guestbook</Typography>
      </Grid>

      <Grid>
        <MessageForm />
      </Grid>

      <Grid container direction={"row"} spacing={1}>
        {fetchLoading ? (
          <CircularProgress />
        ) : (
          <>
            {messages.length === 0 ? (
              <Typography variant="h6">No messages yet</Typography>
            ) : (
              messages.map((message) => (
                <MessageItem
                  key={message.id}
                  author={message.author}
                  message={message.message}
                  image={message.image}
                />
              ))
            )}
          </>
        )}
      </Grid>

    </Grid>
  );
};

export default Messages;