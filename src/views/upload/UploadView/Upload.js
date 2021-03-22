import React, { useState } from 'react';
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
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  input: {
    display: 'none'
  }
}));

const Upload = ({ className, prefi, userMetadata, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    universidad: 'udea',
    archivo: null
  });

  const handleChangeFile = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.files
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      if (!values['archivo']) {
        throw new Error('Secciona un archivo primero');
      }
      //

      if (prefi.length > 0 && userMetadata) {
        const formData = new FormData();
        formData.append('bucketName', prefi);
        formData.append('data', values['archivo'][0]);
        const nameFile =
          values['archivo'][0].name.split('.')[0] + '-' + Date.now() + '.csv';
        await axios
          .post(
            'https://1mptw2qati.execute-api.us-east-1.amazonaws.com/cargadatos',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              params: {
                bucketName: userMetadata.u_prefix,
                nameFile: nameFile
              }
            }
          )
          .then(res => {
            Swal.fire(
              'Buen trabajo!',
              'Archivo para predicción cargado correctamente',
              'success'
            );
          });
      }
    } catch (error) {
      Swal.fire(
        'Buen trabajo!',
        'Archivo para predicción cargado correctamente',
        'success'
      );
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
      <br></br>
    </form>
  );
};

Upload.propTypes = {
  className: PropTypes.string
};

export default Upload;
