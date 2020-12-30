import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { useAuth0,withAuthenticationRequired } from "@auth0/auth0-react";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();


 //obtener usuario
 const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();


  return isAuthenticated &&(
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile user1={user} />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails user1={user} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};


export default withAuthenticationRequired(Account, {
  onRedirecting: () => <h3>Cargando</h3>,
});