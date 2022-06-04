import { Box, Card, CardContent, Stack, Typography, styled, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import Image1 from 'src/assets/images/about1.jpg';

const PolygonImg = styled('img')`
  clip-path: ellipse(50% 47% at 50% 47%);
`;

function About() {
  const navigate = useNavigate();

  return (
    <Box>
      <Stack
        direction='row'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        spacing={2}
        mt={5}
        p={2}>
        <Card variant='outlined' sx={{ border: 0, bgcolor: 'transparent', maxWidth: 500 }}>
          <CardContent>
            <Typography sx={{ mb: 1.5, fontSize: '2.5rem' }} variant='h1' component='div'>
              Vetheal
            </Typography>
            <Typography color='#4e555b' sx={{ fontSize: '1rem' }}>
              Vetheal is an application that provides support for more than 20 animal species, where
              you can get health status, the urgency of the disease and care suggestions for these
              animals as a result of the symptoms entered into the application.
            </Typography>
          </CardContent>
        </Card>
        <PolygonImg width='570px' src={Image1} />
      </Stack>
      <Stack direction='row' spacing={4} mt={5} p={2}>
        <Card variant='outlined' sx={{ border: 0, bgcolor: 'transparent', maxWidth: '560px' }}>
          <CardContent>
            <Typography sx={{ mb: 1.5 }} variant='h1' component='div'>
              Why we&rsquo;re here
            </Typography>
            <Typography color='#4e555b'>
              Today, pets are not just animals living around people, they are family members who
              live almost in the same house and are in constant communication with their owners.
              Pets with any disease cannot speak like humans and cannot tell us about the symptoms
              of this disease. But these animals often reveal the presence of these diseases through
              changes in their body and behavior, and through their illness or ailment. Usually, a
              pet signals its owner when its health is at risk or has a disease, exhibits unusual
              behavior, or changes in its body.
            </Typography>
          </CardContent>
        </Card>
        <Card variant='outlined' sx={{ border: 0, bgcolor: 'transparent', maxWidth: '560px' }}>
          <CardContent>
            <Typography sx={{ mb: 1.5 }} variant='h1' component='div'>
              How we help
            </Typography>
            <Typography color='#4e555b'>
              If you do not have in-depth knowledge of your pet&rsquo;s illness, use Vetheal so as
              not to neglect such symptoms. With Vetheal, learn about your pet&rsquo;s condition by
              entering your pet&rsquo;s symptoms in the app and answering potential questions! With
              Vetheal, you can learn about the condition of the pet, its health, if it is sick, the
              risk level of this disease and whether there is a need for veterinary intervention
              without affecting the psychology of our pets.
            </Typography>
            <Button
              variant='contained'
              color='info'
              sx={{ mt: 2, width: '200px' }}
              onClick={() => navigate('/symptom-wizard')}>
              Get Started
            </Button>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default About;
