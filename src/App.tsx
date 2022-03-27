import './App.css';
import { Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import HorizontalCarousel from './components/horizontal-carousel/index';

function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  return (
    <Container sx={{ p: 5 }}>
      <HorizontalCarousel currentIdx={currentIdx}>
        <Typography>1</Typography>
        <Typography>2</Typography>
        <Typography>3</Typography>
        <Typography>4</Typography>
        <Typography>5</Typography>
      </HorizontalCarousel>
      <Button onClick={() => setCurrentIdx(currentIdx - 1)}>Prev</Button>
      <Button onClick={() => setCurrentIdx(currentIdx + 1)}>Next</Button>
    </Container>
  );
}

export default App;
