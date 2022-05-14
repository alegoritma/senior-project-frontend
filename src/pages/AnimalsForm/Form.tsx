import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardHeader, Divider, CardContent, Typography } from '@mui/material';

import AnimalItem from './AnimalItem';
import { useSelector } from 'src/store';
import LoadingScreen from 'src/components/GenericLoader';

interface AnimalGroup {
  groupName: string;
  animalIds: number[];
}
const animalGroupOrder = {
  companion: 0,
  equine: 1,
  farm: 2,
  exotic: 3
};
function sortAnimalGroupName(a: AnimalGroup, b: AnimalGroup) {
  const rankA = animalGroupOrder[a.groupName];
  const rankB = animalGroupOrder[b.groupName];
  const unknownCount = [rankA!, rankB!].length;
  switch (unknownCount) {
    case 0:
      return a.groupName.localeCompare(b.groupName);
    case 1:
      return rankA === undefined ? -1 : 0;
    case 2:
      return rankA - rankB;
  }
}
export default function AnimalsForm() {
  const { animals, animalIds, loading } = useSelector((state) => state.animals);
  const [animalsGrouped, setAnimalsGrouped] = useState<AnimalGroup[]>([]);

  useEffect(() => {
    const animalsGroupRecord = animalIds.reduce((acc, animalId) => {
      const groupName = animals[animalId].type;
      acc[groupName] ??= { groupName, animalIds: [] as number[] };
      acc[groupName].animalIds.push(animalId);
      return acc;
    }, {} as { [groupName: string]: AnimalGroup });

    setAnimalsGrouped(Object.values(animalsGroupRecord).sort(sortAnimalGroupName));
  }, [animals]);

  return (
    <Box>
      <LoadingScreen loading={loading} />
      <Box display='block'>
        {animalsGrouped.map(({ groupName, animalIds }) => (
          <Card sx={{ mb: 0, background: 'transparent' }} square elevation={0} key={groupName}>
            <Divider />
            <Typography variant='h3' sx={{ mt: 1 }}>
              {`${groupName[0].toUpperCase()}${groupName.slice(1)}`}
            </Typography>
            <CardContent>
              <Grid container spacing={2}>
                {animalIds.map((animalId) => (
                  <Grid item xs={12} sm={6} md={3} key={`animal-item-${animalId}`}>
                    <AnimalItem {...animals[animalId]} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
