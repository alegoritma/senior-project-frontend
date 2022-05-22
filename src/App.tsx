import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { initializeAnimals } from './store/slices/animals';
import { useDispatch } from './store/index';
import { useEffect } from 'react';
import Container from 'src/components/Container';

function App() {
  const content = useRoutes(routes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnimals());
  }, []);

  return <Container>{content}</Container>;
}

export default App;
