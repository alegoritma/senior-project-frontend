import React from 'react';
import { Backdrop, CardMedia, GlobalStyles } from '@mui/material';
import { makeStyles } from '@mui/styles';

type Props = {
  loading: boolean;
};

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#fdfdfd !important',
    display: 'flex',
    zIndex: 99999
  },
  cardMedia: {
    // transform: 'Translate(-50%, -50%)',
    margin: 'auto',
    width: 'auto !important'
    // maxWidth: '100%',
    // height: 'auto'
  }
}));

const LoadingScreen: React.FC<Props> = ({ loading }) => {
  const classes = useStyles();
  return (
    <Backdrop
      className={classes.container}
      // sx={{ backgroundColor: '#fdfdfd',  }}
      // componentsProps={{ root: { className: classes.container } }}
      open={loading}>
      <GlobalStyles styles={{ body: { overflow: loading ? 'hidden' : '' } }} />
      <CardMedia
        className={classes.cardMedia}
        component='img'
        src={require('src/assets/images/animals-loading.gif')}
      />
    </Backdrop>
  );
};

export default LoadingScreen;
