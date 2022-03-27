import { Box, Paper, Slide } from '@mui/material';
import React, { useState } from 'react';

interface Props {
  status: 'current' | 'prev' | 'next';
}

/*
on top (prev)
entering: ↓

on bottom (next)
entering: ↑

current:

going up (prev): ↑
going down (next): ↓

*/

const CarouselElement: React.FC<Props> = ({ status, children }) => {
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [prevStatus, setPrevStatus] = useState('next');

  return (
    <Slide
      onExit={() => {
        setPrevStatus(status);
        if (status === 'prev') setDirection('down');
        if (status === 'next') setDirection('up');
      }}
      onEnter={() => {
        if (prevStatus === 'prev') setDirection('down');
        if (prevStatus === 'next') setDirection('up');
      }}
      direction={direction}
      in={status === 'current'}
      mountOnEnter
      unmountOnExit>
      <Paper>{children}</Paper>
    </Slide>
  );
};

export default CarouselElement;
