import Grid from '@mui/material/Grid2';
import { Card, CardContent, CardHeader, CardMedia } from '@mui/material';
import { apiUrl } from '../../../globalConstants.ts';

interface Props {
  author?: string | null;
  message: string;
  image?: string | null | undefined
}

const MessageItem: React.FC<Props> = ({author, message, image}) => {
  const imageUrl = image ? `${apiUrl}/${image}` : undefined;

  return (
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4}}>
      <Card>
        <CardHeader title={author || 'Anonymous'}/>
        {image && (
          <CardMedia
          component="img"
          image={imageUrl}
          title="Image"/>
        )}
        <CardContent>
          <p>{message}</p>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MessageItem;