import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  name: string;
  id: number;
  image?: string;
  type?: string;
}

const AnimalItem: React.FC<Props> = (props) => {
  const { name, id, image, type } = props;
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => navigate(`/symptom-wizard/select-symptom/${id}`)}>
        <CardMedia component='img' height='140' image={image} alt='green iguana' />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {type}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AnimalItem;
