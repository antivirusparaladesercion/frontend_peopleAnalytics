import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from 'axios';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Link,
  LinearProgress,
  CardHeader,
  CardContent,
  Divider
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const DownloadFiles = ({ className, prefi, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  let [responseData, setResponseData] = useState('');

  const fetchData = async () => {
    console.log('EL PREFIJO DE LA UNIVERSIDAD: ', prefi)
    await axios({
      method: 'post',
      url:
        'https://siedoftkpj.execute-api.us-east-1.amazonaws.com/getUrlsUploaded',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        nombre_ies: prefi
      }
    })
      .then(res => {
        res.data.data.sort(function(a, b) {
          return new Date(b.date) - new Date(a.date);
        }); // Ordenar la respuesta
        setResponseData(res.data.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      {responseData === '' ? (
        <>
          <CardHeader
            subheader="los archivos que ha cargado podrán ser visualizados en breve."
            title="Cargando Archivos Enviados"
          />
          <Divider />
          <CardContent>
            <LinearProgress />
            <LinearProgress color="secondary" />
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader
            subheader="Estos son los archivos que se han cargado al sistema para ser analizados."
            title="Archivos Cargados"
          />
          <Divider />
          <CardContent>
            <PerfectScrollbar>
              <Box minWidth={1050}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Archivo</TableCell>
                      <TableCell>Link de descarga</TableCell>
                      <TableCell>Fecha de carga del archivo</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {responseData.length > 0 ? (
                      responseData
                        .slice(page * limit, page * limit + limit)
                        .map(link => (
                          <TableRow hover key={link.date}>
                            <TableCell>
                              <Box alignItems="center" display="flex">
                                <Typography color="textPrimary" variant="body1">
                                  {link.file_name}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box alignItems="center" display="flex">
                                <Typography color="textPrimary" variant="body1">
                                  <Link href={link.url}>Descargar</Link>
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box alignItems="center" display="flex">
                                <Typography color="textPrimary" variant="body1">
                                  {link.date}
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <h3>Por el momento no tiene archivos Cargados.</h3>
                    )}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={responseData.length}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </CardContent>
        </>
      )}
    </Card>
  );
};

DownloadFiles.propTypes = {
  className: PropTypes.string
};

export default DownloadFiles;
