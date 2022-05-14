import { Box, CircularProgress } from '@mui/material';
import LoadingScreen from 'src/components/GenericLoader';

function SuspenseLoader() {
  return <LoadingScreen loading />;
}

export default SuspenseLoader;
