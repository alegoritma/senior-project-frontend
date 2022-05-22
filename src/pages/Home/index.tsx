import {
  Box,
  List,
  ListItem,
  ListItemText,
  styled,
  Typography,
  Paper,
  Button,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainImage from 'src/assets/images/home-page-main-image.jpg';

const IntroContainer = styled(Box)(`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
`);

const MainTitle = styled(Typography)(`
  font-family: "PT Serif", serif;
  font-weight: 400;
  font-size: 45px;
  color: #ededed;
  text-shadow: '0 0 50px black';
`);

const StepText = styled(Typography)(`
  font-family: "Noto Sans", sans-serif;
  font-weight: 400;
  color: #ededed;
  text-shadow: '0 0 50px black';
`);

function Home() {
  const navigate = useNavigate();

  return (
    <Box style={{ width: '100%', position: 'absolute', left: 0 }}>
      <section style={{ height: '800px', overflowY: 'hidden' }}>
        <img width='100%' src={MainImage} style={{ filter: 'brightness(0.4)' }} />
        <IntroContainer>
          <Box
            // component={Paper}
            // variant='outlined'
            sx={{
              minWidth: 200,
              display: 'flex',
              flexDirection: 'column'
              // pb: 5
              // p: 1,
              // px: 1.5
              // border: '1px solid rgb(255 255 255 / 38%)',
              // backgroundColor: '#00000042'
            }}>
            <MainTitle variant='h1'>Animal Health</MainTitle>
            <MainTitle variant='h1'>Powered by Vetheal</MainTitle>
            <List dense>
              <ListItem>
                <StepText variant='h4'>1. Select your animal</StepText>
              </ListItem>
              <ListItem>
                <StepText variant='h4'>2. Choose a symptom</StepText>
              </ListItem>
              <ListItem>
                <StepText variant='h4'>3. Answer questions</StepText>
              </ListItem>
              <ListItem>
                <StepText variant='h4'>4. Get the result</StepText>
              </ListItem>
            </List>
            <Divider flexItem sx={{ bgcolor: 'rgb(203 203 203 / 65%)' }} />
            <Button
              variant='outlined'
              color='info'
              sx={{ mt: 1.5 }}
              onClick={() => navigate('/symptom-wizard')}>
              Get Started
            </Button>
          </Box>
        </IntroContainer>
      </section>
      <section></section>
    </Box>
  );
}

export default Home;
