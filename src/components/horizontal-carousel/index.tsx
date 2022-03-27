import { Box } from '@mui/material';
import React from 'react';
import CarouselElement from './CarouselElement';


const HorizontalCarousel: React.FC<any> = ({ currentIdx, children }) => {

  return (
    <Box>
      <CarouselElement key={currentIdx - 1} status='prev'>
        {children[currentIdx - 1]}
      </CarouselElement>
      <CarouselElement key={currentIdx} status='current'>
        {children[currentIdx]}
      </CarouselElement>
      <CarouselElement key={currentIdx + 1} status='next'>
        {children[currentIdx + 1]}
      </CarouselElement>
    </Box>
  )
}

export default HorizontalCarousel;