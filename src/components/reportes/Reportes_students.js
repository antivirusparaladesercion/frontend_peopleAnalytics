import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import PerfectScrollbar from 'react-perfect-scrollbar';

import {
  Box,
  Card,
  Button,
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

const ReportesStudents = ({ data }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  let responseData= data;

  

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root)} >
      {responseData === '' ? (
        <>
          <CardHeader
            subheader="El filtrado realizado podra ser visualizado  en breve."
            title="Cargando estudiantes"
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
            subheader="Estos son los estudiantes filtrados."
            title="Reporte"
          />
          <Divider />
          <CardContent>
            <PerfectScrollbar>
              <Box minWidth={1050}>
                <Table  id="tableReport">
                  <TableHead>
                    <TableRow>
                      <TableCell>Estudiante</TableCell>
                      <TableCell>ESTRATO</TableCell>
                      <TableCell>EDAD</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {
                      responseData.length > 0 ? (
                      responseData
                        .slice(page * limit, page * limit + limit)
                        .map(link => (
                          <TableRow hover key={link.CEDULA}>
                            <TableCell>
                              <Box alignItems="center" display="flex">
                                <Typography color="textPrimary" variant="body1">
                                  {link.CEDULA}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box alignItems="center" display="flex">
                                <Typography color="textPrimary" variant="body1">
                                  {link.ESTRATO}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box alignItems="center" display="flex">
                                <Typography color="textPrimary" variant="body1">
                                  {link.EDAD}
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <h3>Por el momento no se ha generado el reporte.</h3>
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
            <div className="row">
            <Button className="col-6" variant="contained" color="primary" >
            Nuevo Reporte
          </Button>
          
          
            

            </div>
         
          </CardContent>
        </>
      )}
    </Card>
  );
};
 

export default ReportesStudents;