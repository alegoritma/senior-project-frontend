import { Paper } from '@mui/material';
import React, { useEffect } from 'react';


interface Props {
  status: 'current' | 'prev' | 'next'
}

const CarouselElement: React.FC<Props> = ({ status, children }) => {
  useEffect(() => {

  }, [status])
  return (
    <Paper>
      {children}
    </Paper>
  )
}

export default CarouselElement