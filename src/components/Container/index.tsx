import React from 'react';
import Header from './Header';
import { Container } from '@mui/material';

const AppContainer: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Container sx={{ minHeight: 'calc(100% - 69px)', display: 'grid' }}>{children}</Container>
    </>
  );
};
export default AppContainer;
