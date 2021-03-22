import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import DownloadTwo from './DownloadTwo';

import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const DownloadView = () => {
  const classes = useStyles();

  const { user, getAccessTokenSilently } = useAuth0();

  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = process.env.REACT_APP_DOMAIN;

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: 'read:current_user'
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, []);

  let prefijo = '';
  if (userMetadata) {
    prefijo = userMetadata.u_prefix;
  }

  return (
    prefijo.length > 0 && (
      <Page className={classes.root} title="Download Predictions">
        <Container maxWidth={false}>
          <Box mt={3}>
            <DownloadTwo prefi={prefijo} />
          </Box>
        </Container>
      </Page>
    )
  );
};

export default withAuthenticationRequired(DownloadView, {
  onRedirecting: () => <h3>Cargando</h3>
});
