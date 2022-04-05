import React from 'react';
import { Card, Box, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import { useSelector } from 'src/store';

interface Props {
  animalId: string;
}

const Banner: React.FC<Props> = ({ animalId }) => {
  const { animals, loading } = useSelector((state) => state.animals);

  // if (loading) return <p>Loading...</p>;

  const animal = animals[animalId];

  return (
    <Box>
      <CardMedia component='img' height='440' image={animal?.image} />
      <CardContent>
        <Typography variant='h1' component='div'>
          {animal?.name ?? '---'}
        </Typography>
      </CardContent>
    </Box>
  );
};

const Container: React.FC<Props> = ({ animalId, children }) => {
  return (
    <Card>
      <Banner animalId={animalId} />
      <CardContent>
        <Typography variant='h4' component='div'>
          Please select a symptom below:
        </Typography>
      </CardContent>
      <Divider />
      {children}
    </Card>
  );
};

export default Container;
