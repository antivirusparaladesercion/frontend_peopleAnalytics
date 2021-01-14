import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(() => ({
  root: {},
  table: {
    minWidth: 650
  }
}));

const ProfileDetails = ({ className, user1, metadata, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: user1.name,
    email: user1.email,
    emailsSend: []
  });

  const [emailTemp, setEmailTemp] = useState('');

  const fetchEmails = async () => {
    await axios({
      method: 'get',
      url:
        'https://3lm0f6w2tk.execute-api.us-east-1.amazonaws.com/prod/mail/list/',
      params: {
        prefix_uni: 'udea'
      }
    })
      .then(res => {
        setValues({
          emailsSend: res.data
        });
        console.log('EL VALOR EN EL ESTADO: ', values.emailsSend);
      })
      .catch(err => console.log(err));
  };

  const handleChange = event => setEmailTemp(event.target.value);

  const handleAddEmail = () => {
    const newValues = [
      ...values.emailsSend,
      {
        university: user1.name,
        id: 1,
        email: emailTemp
      }
    ];
    setValues({
      emailsSend: newValues
    });
    console.log(values.emailsSend);
  };

  useEffect(() => {
    fetchEmails();
  }, [metadata]);

  if (!metadata) {
    console.log('METADATA NULA');
  } else {
    console.log(
      'LA METADATA DEL DETALLE DE PERFIL ES LA SIGUIENTE: ',
      metadata.u_prefix
    );
  }

  return (
    <>
      <Card>
        <CardHeader subheader="Informacion Basica" title="Perfil Universidad" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                //helperText="Please specify the first name"
                label="Nombre Universidad"
                name="firstName"
                value={values.name}
                variant="outlined"
                disabled
                required
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                required
                label="Email"
                name="email"
                value={values.email}
                variant="outlined"
                disabled
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <br />

      <Card>
        <CardHeader subheader="Direcciones de email para envío de predicciones" />
        <Divider />
        <CardContent>
          <Grid item md={12} xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {values.emailsSend.map(element => (
                    <TableRow key={element.id}>
                      <TableCell component="th" scope="row">
                        {element.email}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<DeleteIcon />}
                        >
                          {' '}
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow key="create">
                    <TableCell component="th" scope="row">
                      <TextField
                        fullWidth
                        name="email"
                        required
                        variant="outlined"
                        placeholder="Añadir email"
                        onChange={handleChange}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        endIcon={<SaveIcon />}
                        onClick={handleAddEmail}
                      >
                        Registrar
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item md={6} xs={12}></Grid>
          <Grid item md={6} xs={12}></Grid>
        </CardContent>
      </Card>
    </>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
