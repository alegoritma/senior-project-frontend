import React from 'react';
import { Card, Box, CardContent, CardMedia, Divider, Typography, IconButton } from '@mui/material';
import { useSelector } from 'src/store';
import { useNavigate } from 'react-router';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
interface Props {
  animalId: string;
}

const Banner: React.FC<Props> = ({ animalId }) => {
  const { animals } = useSelector((state) => state.animals);
  const navigate = useNavigate();
  // if (loading) return <p>Loading...</p>;

  const animal = animals[animalId];

  return (
    <Box>
      <CardMedia component='img' height='440' image={animal?.image} />
      <Box height={0} mb={1}>
        <Box sx={{ transform: 'translateY(-100%)' }}>
          <Box
            sx={{ background: 'linear-gradient(0, black, transparent)' }}
            p={2}
            pl={0}
            pt={3}
            pb={1}
            display='flex'>
            <IconButton
              onClick={() => navigate(-1)}
              size='small'
              sx={{ color: (theme) => theme.palette.grey[200] }}>
              <ChevronLeftIcon fontSize='large' />
            </IconButton>
            <Typography
              sx={{ fontSize: '2rem', color: (theme) => theme.palette.grey[200] }}
              variant='h1'
              component='div'>
              {animal?.name ?? '---'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const Container: React.FC<Props> = ({ animalId, children }) => {
  return (
    <Card sx={{ mt: 2 }}>
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
