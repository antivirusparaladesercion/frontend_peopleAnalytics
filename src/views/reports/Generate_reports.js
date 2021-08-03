import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from 'axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import FiltrosStudents from 'src/components/filtros/Filtros_students';


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
  Divider,
  Button
} from '@material-ui/core';
import ReportesStudents from 'src/components/reportes/Reportes_students';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const students={
  "students": [
    {
      "CEDULA": 1059712805,
      "Estado": 1,
      "EDAD": 19,
      "ESTRATO": 2,
      "DERECHOSMATRICULA": 143006,
      "PUNTAJE_COMPRENSION_LECTORA": 78.637,
      "PUNTAJE_RAZONAMIENTO_LOGICO": 89.605,
      "PROMEDIO_SEMESTRE": 2.62,
      "PROMEDIO_PROGRAMA": 2.43,
      "MATERIAS_REPETIDAS": 3,
      "PERIO_DE_PRUEBA": 1,
      "MATERIAS_APROBADAS": 1,
      "MATERIAS_REPROBADAS": 4,
      "MATERIAS_REPRO_IMPORT": 3,
      "DIFERENCIAL": 1,
      "MECANICA": 0,
      "ALGEBRA": 1,
      "VECTORIAL": 0,
      "INTEGRAL": 0,
      "CAMPOS": 0,
      "DESC_FISICA": 1,
      "DISCRETAS_I": 0,
      "LOGICA_III": 0,
      "ALGEBRA_LINEAL": 0,
      "INGLES_I": 0,
      "VIVAMOS_U": 0,
      "INGLES_II": 0,
      "INGLES_III": 0,
      "DISCRETAS_II": 0,
      "EFECTIVIDAD_PROGRAMA": 0.21428571428571427,
      "CARACTERCOLEGIO": 3,
      "NUMSEMESTRES": 4,
      "CREDAPROBADOS": 10,
      "CREDGRADO": 164,
      "CREDITOS_ULTIM_SEMEST_MATRIC": 7,
      "ASISTE_SOCIOPEDAGO": 0,
      "VULNERA_ACADEMICA": 0,
      "VULNERA_ECONOMICO": 0,
      "VULNERA_EMOCIONAL": 0,
      "VULNERA_FAMILIAR": 0,
      "VULNERA_MANEJO_TIEMPO": 0,
      "VULNERA_PSICOLOGICO": 0,
      "VULNERA_SALUD": 0,
      "VULNERA_SOCIAL": 0,
      "VULNERA_VOCACIONAL": 0,
      "TALLERES_ASISTIDOS": 1,
      "TOTAL_TUTORIAS": 0,
      "HORAS_TUTORIA": 0
    },
    {
      "CEDULA": 1040741416,
      "Estado": 1,
      "EDAD": 19,
      "ESTRATO": 2,
      "DERECHOSMATRICULA": 141573,
      "PUNTAJE_COMPRENSION_LECTORA": 77.413,
      "PUNTAJE_RAZONAMIENTO_LOGICO": 85.389,
      "PROMEDIO_SEMESTRE": 4.02,
      "PROMEDIO_PROGRAMA": 4.02,
      "MATERIAS_REPETIDAS": 0,
      "PERIO_DE_PRUEBA": 0,
      "MATERIAS_APROBADAS": 0,
      "MATERIAS_REPROBADAS": 0,
      "MATERIAS_REPRO_IMPORT": 0,
      "DIFERENCIAL": 0,
      "MECANICA": 0,
      "ALGEBRA": 0,
      "VECTORIAL": 0,
      "INTEGRAL": 0,
      "CAMPOS": 0,
      "DESC_FISICA": 0,
      "DISCRETAS_I": 0,
      "LOGICA_III": 0,
      "ALGEBRA_LINEAL": 0,
      "INGLES_I": 0,
      "VIVAMOS_U": 0,
      "INGLES_II": 0,
      "INGLES_III": 0,
      "DISCRETAS_II": 0,
      "EFECTIVIDAD_PROGRAMA": 1,
      "CARACTERCOLEGIO": 3,
      "NUMSEMESTRES": 2,
      "CREDAPROBADOS": 31,
      "CREDGRADO": 164,
      "CREDITOS_ULTIM_SEMEST_MATRIC": 19,
      "ASISTE_SOCIOPEDAGO": 0,
      "VULNERA_ACADEMICA": 0,
      "VULNERA_ECONOMICO": 0,
      "VULNERA_EMOCIONAL": 0,
      "VULNERA_FAMILIAR": 0,
      "VULNERA_MANEJO_TIEMPO": 0,
      "VULNERA_PSICOLOGICO": 0,
      "VULNERA_SALUD": 0,
      "VULNERA_SOCIAL": 0,
      "VULNERA_VOCACIONAL": 0,
      "TALLERES_ASISTIDOS": 5,
      "TOTAL_TUTORIAS": 78,
      "HORAS_TUTORIA": 27
    },
    {
      "CEDULA": 1000100877,
      "Estado": 1,
      "EDAD": 19,
      "ESTRATO": 2,
      "DERECHOSMATRICULA": 1316400,
      "PUNTAJE_COMPRENSION_LECTORA": 97.279,
      "PUNTAJE_RAZONAMIENTO_LOGICO": 82.967,
      "PROMEDIO_SEMESTRE": 3.7,
      "PROMEDIO_PROGRAMA": 3.7,
      "MATERIAS_REPETIDAS": 0,
      "PERIO_DE_PRUEBA": 0,
      "MATERIAS_APROBADAS": 0,
      "MATERIAS_REPROBADAS": 0,
      "MATERIAS_REPRO_IMPORT": 0,
      "DIFERENCIAL": 0,
      "MECANICA": 0,
      "ALGEBRA": 0,
      "VECTORIAL": 0,
      "INTEGRAL": 0,
      "CAMPOS": 0,
      "DESC_FISICA": 0,
      "DISCRETAS_I": 0,
      "LOGICA_III": 0,
      "ALGEBRA_LINEAL": 0,
      "INGLES_I": 0,
      "VIVAMOS_U": 0,
      "INGLES_II": 0,
      "INGLES_III": 0,
      "DISCRETAS_II": 0,
      "EFECTIVIDAD_PROGRAMA": 1,
      "CARACTERCOLEGIO": 3,
      "NUMSEMESTRES": 2,
      "CREDAPROBADOS": 11,
      "CREDGRADO": 164,
      "CREDITOS_ULTIM_SEMEST_MATRIC": 10,
      "ASISTE_SOCIOPEDAGO": 0,
      "VULNERA_ACADEMICA": 0,
      "VULNERA_ECONOMICO": 0,
      "VULNERA_EMOCIONAL": 0,
      "VULNERA_FAMILIAR": 0,
      "VULNERA_MANEJO_TIEMPO": 0,
      "VULNERA_PSICOLOGICO": 0,
      "VULNERA_SALUD": 0,
      "VULNERA_SOCIAL": 0,
      "VULNERA_VOCACIONAL": 0,
      "TALLERES_ASISTIDOS": 0,
      "TOTAL_TUTORIAS": 0,
      "HORAS_TUTORIA": 0
    },
    {
      "CEDULA": 1000292242,
      "Estado": 1,
      "EDAD": 18,
      "ESTRATO": 1,
      "DERECHOSMATRICULA": 282212,
      "PUNTAJE_COMPRENSION_LECTORA": 91.576,
      "PUNTAJE_RAZONAMIENTO_LOGICO": 86.08,
      "PROMEDIO_SEMESTRE": 9.99,
      "PROMEDIO_PROGRAMA": 9.99,
      "MATERIAS_REPETIDAS": 0,
      "PERIO_DE_PRUEBA": 0,
      "MATERIAS_APROBADAS": 0,
      "MATERIAS_REPROBADAS": 0,
      "MATERIAS_REPRO_IMPORT": 0,
      "DIFERENCIAL": 0,
      "MECANICA": 0,
      "ALGEBRA": 0,
      "VECTORIAL": 0,
      "INTEGRAL": 0,
      "CAMPOS": 0,
      "DESC_FISICA": 0,
      "DISCRETAS_I": 0,
      "LOGICA_III": 0,
      "ALGEBRA_LINEAL": 0,
      "INGLES_I": 0,
      "VIVAMOS_U": 0,
      "INGLES_II": 0,
      "INGLES_III": 0,
      "DISCRETAS_II": 0,
      "EFECTIVIDAD_PROGRAMA": 0,
      "CARACTERCOLEGIO": 3,
      "NUMSEMESTRES": 1,
      "CREDAPROBADOS": 16,
      "CREDGRADO": 164,
      "CREDITOS_ULTIM_SEMEST_MATRIC": 14,
      "ASISTE_SOCIOPEDAGO": 1,
      "VULNERA_ACADEMICA": 0,
      "VULNERA_ECONOMICO": 0,
      "VULNERA_EMOCIONAL": 0,
      "VULNERA_FAMILIAR": 0,
      "VULNERA_MANEJO_TIEMPO": 0,
      "VULNERA_PSICOLOGICO": 0,
      "VULNERA_SALUD": 0,
      "VULNERA_SOCIAL": 0,
      "VULNERA_VOCACIONAL": 0,
      "TALLERES_ASISTIDOS": 1,
      "TOTAL_TUTORIAS": 0,
      "HORAS_TUTORIA": 0
    }
  ]
}


const GenerateReports = ({ className, prefi, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [estudiantes,setEstudiantes]=useState('')

  const [responseData, setResponseData] = useState('');

  /* const fetchData = async () => {
    await axios({
      method: 'post',
      url:
        'https://t1qr7g56qa.execute-api.us-east-1.amazonaws.com/getReports',
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
  }; */

  const showReport = async () => {
    await axios({
      method: 'post',
      url:
        'https://mrtjkqo0zk.execute-api.us-east-1.amazonaws.com/guet_predictions',
      headers: { 'Content-Type': 'application/json' },
      data: students
    })
      .then(res => {
        
        setResponseData(res.data.students);
        console.log('la data',estudiantes);
      })
      .catch(err => console.log(err));
  };

const newReport = ()=> {
  setResponseData('');
  setEstudiantes('');
}

useEffect(() => {
 
  if(estudiantes.length > 0) {
     showReport()
    console.log('estudiantes en useefect',estudiantes)
  }
}, [estudiantes,setEstudiantes]);
 

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      {estudiantes ===''  ?  (
        <>
          <CardHeader
            subheader="Para generar un reporte, puedes realizar varios tipos de filtros a los estudiantes."
            title="Generar Reportes"

          />
          <Divider />
          
          <CardContent>
          <FiltrosStudents estudiantes = {setEstudiantes}/>
          
          
          </CardContent>
        </>
      ) : responseData !='' &&(
        <>
          <CardHeader
            subheader="Este es el reporte de probabilidad de desercion y analisis de sentimiento para los estudiantes filtrados."
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
                      <TableCell>Probabilidad de Desercion</TableCell>
                      <TableCell>Analisis de sentimiento</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {
                      responseData !='' && responseData != undefined ? (
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
                                  {link.PROBABILIDAD_DESERCION*100}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box alignItems="center" display="flex">
                                <Typography color="textPrimary" variant="body1">
                                  {link.ANALISIS_SENTIMIENTO}
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <></>
                    )}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>

            { 
                      responseData !='' && responseData != undefined ? (
             <>
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
            <Button className="col-6" variant="contained" color="primary" onClick={()=>newReport() }>
            Nuevo Reporte
          </Button>
          
          
            <div className="col-6">
            <ReactHTMLTableToExcel
              id="botonExportarExcel"
              className="btn btn-success"
              table="tableReport"
              filename="reporteDesercionExcel"
              sheet="Resumen"
              buttonText = "Exportar a Excel"

            
            />
            </div>

            </div>
             </>         ):(<></>)}

          </CardContent>
          
          

        </>
        

      )}
    </Card>
  );
};
 GenerateReports.propTypes = {
  className: PropTypes.string
};

export default GenerateReports;
