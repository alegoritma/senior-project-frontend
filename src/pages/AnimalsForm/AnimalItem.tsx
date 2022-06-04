import { Card, CardActionArea, CardMedia, Typography, Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  name: string;
  id: number;
  image?: string;
  type?: string;
}

const AnimalItem: React.FC<Props> = (props) => {
  const { name, id, image } = props;
  const navigate = useNavigate();
  return (
    <Card
      variant='outlined'
      // square
      sx={{ maxWidth: 345, borderLeft: 0, borderRight: 0, bgvolor: 'transparent' }}>
      <CardActionArea onClick={() => navigate(`/symptom-wizard/select-symptom/${id}`)}>
        <CardMedia component='img' height='140' image={image} alt='green iguana' />
        <Box height={0}>
          <Typography
            sx={{
              transform: 'TranslateY(-100%)',
              background: 'linear-gradient(0, black, transparent)',
              p: 1,
              pl: 1.5,
              pt: 2,
              color: (theme) => theme.palette.grey[200]
            }}
            variant='h5'
            component='div'>
            {name}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default AnimalItem;
