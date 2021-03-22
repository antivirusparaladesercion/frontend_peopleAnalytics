import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import logo from '../../assets/logo.png';
import { Link as RouterLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Box,
  Button,
  Grid,
  Container,
  Typography,
  makeStyles,
  Modal
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useAuth0 } from '@auth0/auth0-react';
import backgroundvid from '../../assets/videobackground.mp4';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const LoginView = () => {
  const { loginWithRedirect } = useAuth0();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Page className={classes.root} title="Login">
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          width: '100%',
          left: '50%',
          top: '50%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          zindex: '-1'
        }}
      >
        <source src={backgroundvid} type="video/mp4" />
      </video>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        mx="auto"
      >
        <Container maxWidth="sm" justifyContent="center">
          <Box mb={3} justifyContent="center" position="relative" color="white">
            {' '}
            <Avatar alt="logo" src={logo} className={classes.large} />
            <Typography color="text.primary" variant="h1">
              Bienvenido
            </Typography>
            <Typography color="text.secondary" gutterBottom variant="body2">
              Inicia sesión en la plataforma de people analytics
            </Typography>
          </Box>

          <Box my={2}>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={() => loginWithRedirect()}
            >
              Ingresar
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Button
                color="primary"
                size="large"
                fullWidth
                type="submit"
                variant="contained"
                onClick={() => handleOpen()}
              >
                Ver demo
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                <div style={modalStyle} className={classes.paper}>
                  Video demostrativo
                </div>
              </Modal>
            </Grid>
            <Grid item xs={12} md={6}>
            <RouterLink to="/request-trial">
              <Button
                color="primary"
                size="large"
                fullWidth
                type="submit"
                variant="contained"
              >
                Solicitar prueba
              </Button>
                </RouterLink>
              </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
