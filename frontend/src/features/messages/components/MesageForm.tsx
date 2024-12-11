import Grid from '@mui/material/Grid2';
import { Button, TextField } from '@mui/material';
import FileInput from '../../../components/FileInput/FileInput.tsx';
import { MessageMutation } from '../../../app/types';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { createMessage } from '../messagesThunks.ts';
import { selectCreateLoading } from '../messagesSlice.ts';

const initialState = {
  author: '',
  message: '',
  image: null,
}

const MessageForm = () => {
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectCreateLoading);
  const [form, setForm] = useState<MessageMutation>(initialState);

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(createMessage(form));
  };

  const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const fileEventOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setForm(prevState => ({
        ...prevState,
        [name]: files[0] ? files[0] : null
      }))
    }
  };

  return (
    <form onSubmit={submitForm}>
      <Grid container direction={"column"} spacing={2}>
        <Grid size={{xs: 12}}>
          <TextField
            id="author"
            name="author"
            label="Author"
            value={form.author}
            onChange={inputOnChangeHandler}
          />
        </Grid>

        <Grid size={{xs: 12}}>
          <TextField
            id="message"
            name="message"
            label="Message"
            value={form.message}
            onChange={inputOnChangeHandler}
            required
          />
        </Grid>

        <Grid size={{xs: 12}}>
          <FileInput name="image" label="Image" onGetFile={fileEventOnChangeHandler}/>
        </Grid>

        <Grid>
          <Button color="primary" type="submit" disabled={createLoading}>
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default MessageForm;