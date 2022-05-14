import './App.css';
import { Container } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { initializeAnimals } from './store/slices/animals';
import { useDispatch } from './store/index';
import { useEffect } from 'react';

function App() {
  const content = useRoutes(routes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnimals());
  }, []);

  return <Container sx={{ p: 5, height: '100vh' }}>{content}</Container>;
}

export default App;
