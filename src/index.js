import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import history from "./utils/history";
import 'bootstrap/dist/css/bootstrap.min.css';
const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo
      ? appState.returnTo
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider

    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    audience={process.env.REACT_APP_AUDIENCE}
    scope="read:current_user update:current_user_metadata"

    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById('root')
);
