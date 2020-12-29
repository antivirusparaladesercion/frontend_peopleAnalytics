import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Typography
} from '@material-ui/core';

import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
//import config from 'src/auth_config.json';

const useStyles = makeStyles(() => ({
  root: {},
  input: {
    display: 'none'
  }
}));

const Upload = ({ className,prefi,userMetadata, ...rest }) => {
  //Obtener metadata

  

  //
  const classes = useStyles();
  const [values, setValues] = useState({
    universidad: 'udea',
    archivo: null
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleChangeFile = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.files
    });
  };

  const handleSubmit = async event => {
    console.log('aprete boton',prefi,userMetadata)
    event.preventDefault();
    try {
      if (!values['archivo']) {
        throw new Error('Secciona un archivo primero');
      }
      //

      if (prefi.length > 0 && userMetadata) {
        console.log(
          'prueba adentro para enviar a bucket: ',
           userMetadata.u_prefix
        );

        const formData = new FormData();
        formData.append('bucketName', prefi);
        formData.append('data', values['archivo'][0]);
        console.log('el archivo: ', values['archivo'][0]);
        await axios
          .post('http://ApiPeopleAnalyticsDev-env.eba-v39ukvyc.us-east-2.elasticbeanstalk.com/api/v1/data-upload', formData, {
            headers: {
              enctype: 'multipart/form-data'
            }
          })
          .then(res => {
            Swal.fire(
              'Buen trabajo!',
              'Archivo para predicción cargado correctamente',
              'success'
            );
          });
      }

      //

      // handle success
    } catch (error) {
      // handle error
    }
  };

  return (
    <form
      autoComplete="off"
      noValidate
      method="POST"
      onSubmit={handleSubmit}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Para predicciones del modelo"
          title="Carga de archivos"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <input
                required
                accept=".csv"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                name="archivo"
                onChange={handleChangeFile}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Seleccione el archivo
                </Button>
              </label>
            </Grid>

            <Grid item md={6} xs={12}>
              {values['archivo'] === null ? (
                <Typography color="textPrimary" variant="body1">
                  No ha seleccionado ningún archivo
                </Typography>
              ) : (
                <Typography color="textPrimary" variant="body1">
                  Archivo a cargar: {values['archivo'][0].name}
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            value="Submit"
          >
            Enviar CSV
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Upload.propTypes = {
  className: PropTypes.string
};

export default Upload;
