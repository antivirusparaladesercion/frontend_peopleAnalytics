import React,{ useState, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Upload from './Upload';
import DownloadFiles from './DownloadFiles';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

function UploadView() {
  const classes = useStyles();

  //prueba dinamica

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();



  const [userMetadata, setUserMetadata] = useState(null);


  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = process.env.REACT_APP_DOMAIN;

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, []);

  console.log('uuser: ', user)
  let prefijo='';
  if (userMetadata) {
    prefijo = userMetadata.u_prefix;
    console.log('prueba adentro prefix_u arriba download: ');
  }
  
  
  

  


  //

  return prefijo.length >0 && (
    <Page className={classes.root} title="Upload Files">
      <Container maxWidth={false}>

        <Upload userMetadata={userMetadata} prefi={prefijo}/>

      </Container>
      

      <Container maxWidth={false}>

        <DownloadFiles prefi={prefijo}/>

      </Container>

    </Page>
  );
}

export default withAuthenticationRequired(UploadView, {
  onRedirecting: () => <h3>Cargando</h3>,
});
