import { Box } from '@mui/material';
import React from 'react';
import CarouselElement from './CarouselElement';
import { TransitionGroup } from 'react-transition-group';

interface Props {
  currentIdx: number;
  children: Array<JSX.Element>;
}

const HorizontalCarousel: React.FC<Props> = ({ currentIdx, children }) => {
  const getStatus = (idx) => {
    if (idx < currentIdx) return 'prev';
    if (currentIdx < idx) return 'next';
    return 'current';
  };
  return (
    <TransitionGroup>
      {children.map((child, i) => (
        <CarouselElement key={i} status={getStatus(i)}>
          {child}
        </CarouselElement>
      ))}
    </TransitionGroup>
  );
};

export default HorizontalCarousel;
