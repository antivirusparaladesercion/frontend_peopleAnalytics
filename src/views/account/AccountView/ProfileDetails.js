import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
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
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import validator from 'validator';

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
        prefix_uni: metadata.u_prefix
      }
    })
      .then(res => {
        setValues({
          name: user1.name,
          email: user1.email,
          emailsSend: res.data
        });
      })
      .catch(err => console.log(err));
  };

  const handleChange = event => setEmailTemp(event.target.value);

  const handleRemoveEmail = item => () => {
    console.log('EL ID DEL ITEM: ', item.id);

    let requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    fetch(
      `https://3lm0f6w2tk.execute-api.us-east-1.amazonaws.com/prod/mail/delete/?id=${item.id}`,
      requestOptions
    )
      .then(() => {
        let items = values.emailsSend.filter(email => email.id !== item.id);
        setValues({
          name: user1.name,
          email: user1.email,
          emailsSend: items
        });
      })
      .catch(error =>
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al eliminar'
        })
      );
  };

  const handleAddEmail = () => {
    const config = {
      headers: {
        'Content-Type': 'text/plain'
      }
    };

    axios
      .post(
        'https://3lm0f6w2tk.execute-api.us-east-1.amazonaws.com/prod/mail',
        {
          email: emailTemp,
          university: user1.name,
          u_prefix: metadata.u_prefix
        },
        config
      )
      .then(res => {
        const newValues = [
          ...values.emailsSend,
          {
            university: res.data.university,
            id: res.data.id,
            email: res.data.email
          }
        ];
        setValues({
          name: user1.name,
          email: user1.email,
          emailsSend: newValues
        });
      })
      .catch(error =>
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar el email'
        })
      );
  };

  useEffect(() => {
    fetchEmails();
  }, [metadata]);

  return (
    <>
      <Card>
        <CardHeader subheader="Informacion Basica" title="Perfil Universidad" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Typography color="textSecondary" variant="body1">
                Universidad: {values.name}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography color="textSecondary" variant="body1">
                Email: {values.email}
              </Typography>
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
                          onClick={handleRemoveEmail(element)}
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
                        error={
                          validator.isEmail(emailTemp) || emailTemp === ''
                            ? false
                            : true
                        }
                        name="add_email"
                        required
                        variant="outlined"
                        placeholder="Añadir email"
                        helperText={
                          validator.isEmail(emailTemp) || emailTemp === ''
                            ? false
                            : 'No es un correo'
                        }
                        onChange={handleChange}
                        value={emailTemp}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        disabled={validator.isEmail(emailTemp) ? false : true}
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
