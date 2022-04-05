import React from 'react';
import { Box, Grid } from '@mui/material';

import AnimalItem from './AnimalItem';
import { useSelector } from 'src/store';

export default function AnimalsForm() {
  const { animals, animalIds, loading } = useSelector((state) => state.animals);

  if (loading) return <p>Animals Loading...</p>;

  return (
    <Box>
      <Grid container spacing={2}>
        {animalIds.map((animalId) => (
          <Grid item xs={12} sm={6} md={4} key={`animal-item-${animalId}`}>
            <AnimalItem {...animals[animalId]} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
