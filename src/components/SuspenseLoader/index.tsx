import { Box, CircularProgress } from '@mui/material';

function SuspenseLoader() {
  return (
    <Box
      sx={{ width: '100%', height: '100%' }}
      display='flex'
      alignItems='center'
      justifyContent='center'
      padding={10}>
      <CircularProgress size={54} disableShrink thickness={3} />
    </Box>
  );
}

export default SuspenseLoader;
