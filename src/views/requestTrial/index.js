import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles,
  Select,
  InputLabel,
  MenuItem,
  FormControl
} from '@material-ui/core';
import Page from 'src/components/Page';
import moment from 'moment';
import Swal from 'sweetalert2';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  }
}));

const RequestTrialView = () => {
  const classes = useStyles();

  return (
    <Container>
    <Page className={classes.root} title="Register">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              fullName: '',
              role: '',
              institutionName: '',
              institutionType: '',
              character: '',
              reason: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Ingrese un correo electrónico válido.')
                .max(255)
                .required('El correo electrónico es requerido'),
              fullName: Yup.string()
                .max(255)
                .required('El nombre completo es obligatorio'),
              institutionName: Yup.string()
                .max(255)
                .required('El nombre completo es obligatorio'),
              role: Yup.string()
                .max(255)
                .required('Obligatorio'),
              institutionType: Yup.string()
                .max(255)
                .required('Obligatorio'),
              reason: Yup.string()
                .max(500)
                .required('Obligatorio')
            })}
            onSubmit={(values, { setSubmitting }) => {
              let formToSend = new FormData();
              formToSend.append('nombre', values.fullName);
              formToSend.append('correo', values.email);
              formToSend.append('institucion', values.institutionName);
              formToSend.append('tipo-institucion', values.institutionType);
              formToSend.append('caracter-institucion', values.character);
              formToSend.append('rol', values.role);
              formToSend.append('motivo', values.reason);
              formToSend.append(
                'fecha-registro',
                moment().format('MMMM Do YYYY, h:mm:ss a')
              );
              fetch(
                process.env.REACT_APP_GOOGLE_SHEET,
                { method: 'POST', body: formToSend }
              )
                .then(() =>
                  Swal.fire(
                    'Registro exitoso',
                    'Nos comunicaremos con usted para brindarle el acceso',
                    'success'
                  )
                )
                .catch(() =>
                  Swal.fire(
                    'Error 502',
                    'Presentamos problemas internos, inténtelo mas tarde',
                    'error'
                  )
                );
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Solicita una prueba
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Déjanos tus datos y te enviaremos una cuenta de prueba para
                    que interactúes con nuestra plataforma.{' '}
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.fullName && errors.fullName)}
                  fullWidth
                  helperText={touched.fullName && errors.fullName}
                  label="Nombre completo"
                  margin="normal"
                  name="fullName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Correo electrónico"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(
                    touched.institutionName && errors.institutionName
                  )}
                  fullWidth
                  helperText={touched.institutionName && errors.institutionName}
                  label="Nombre de la institución o compañía"
                  margin="normal"
                  name="institutionName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.institutionName}
                  variant="outlined"
                />
                <Box alignItems="center" display="flex" ml={-1}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="institution-type">
                      Tipo de institución
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="institutionType"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.institutionType}
                    >
                      <MenuItem value={'Superior'}>Educación superior</MenuItem>
                      <MenuItem value={'Basica y media'}>
                        Educación básica y media
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box alignItems="center" display="flex" ml={-1}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="character">
                      Caracter de la institución
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="character"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.character}
                    >
                      <MenuItem value={'publica'}>Pública</MenuItem>
                      <MenuItem value={'privada'}>Privada</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <TextField
                  error={Boolean(touched.role && errors.role)}
                  fullWidth
                  helperText={touched.role && errors.role}
                  label="¿Cual es su rol en la compañía o institución?"
                  multiline
                  margin="normal"
                  name="role"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.role}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.reason && errors.reason)}
                  fullWidth
                  helperText={touched.reason && errors.reason}
                  label="¿Por que le gustaría probar la plataforma?"
                  multiline
                  margin="normal"
                  name="reason"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.reason}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    ENVIAR
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  <Link component={RouterLink} to="/login" variant="h6">
                    Volver al inicio
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
    </Container>
  );
};

export default RequestTrialView;
