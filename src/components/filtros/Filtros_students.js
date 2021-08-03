import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import axios from 'axios';
import { Button } from '@material-ui/core';
import {

} from '@material-ui/core';
import ReportesStudents from '../reportes/Reportes_students';
const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const FiltrosStudents = ({estudiantes}) => {
    const classes = useStyles();
    const [age2, setAge2] = React.useState('');
    const [age1, setAge1] = React.useState('');
    const [filtro, setFiltro] = React.useState('None');
    const [matricula1, setMatricula1] = React.useState('');
    const [matricula2, setMatricula2] = React.useState('');
    const [estrato, setEstrato] = React.useState('');
    const [documento, setDocumento] = React.useState('');

    const [age2d, setAge2d] = React.useState(true);
    const [age1d, setAge1d] = React.useState(true);
    const [matricula1d, setMatricula1d] = React.useState(true);
    const [matricula2d, setMatricula2d] = React.useState(true);
    const [estratod, setEstratod] = React.useState(true);
    const [documentod, setDocumentod] = React.useState(true);

    const [responseData2, setResponseData2] = useState('');
    const changueEdad1 = (event) => {
        setAge1(event.target.value);
    };

    const changueValor = () => {
        let valor = filtro;
        if (valor === 'all') {
            console.log('filt1', filtro);
            setAge1d(true)
            setAge2d(true)
            setMatricula1d(true)
            setMatricula2d(true)
            setEstratod(true)
            setDocumentod(true)
        } else if (valor === 'cedula') {
            console.log('filt', filtro);
            setAge1d(true)
            setAge2d(true)
            setMatricula1d(true)
            setMatricula2d(true)
            setEstratod(true)
            setDocumentod(false)
        } else if (valor === 'personalizado') {
            console.log('filt', filtro);
            setAge1d(false)
            setAge2d(false)
            setMatricula1d(false)
            setMatricula2d(false)
            setEstratod(false)
            setDocumentod(true)

        }
    }

    const changueFiltro = (event) => {
        const valor = event.target.value
        setFiltro(valor)
        changueValor()




    };
    const changueEdad2 = (event) => {
        setAge2(event.target.value);
    };

    const changueMatricula1 = (event) => {
        setMatricula1(event.target.value);
    };
    const changueMatricula2 = (event) => {
        setMatricula2(event.target.value);
    };
    const changueEstrato = (event) => {
        setEstrato(event.target.value);
    };
    const changueDocumento = (event) => {
        setDocumento(event.target.value);
    };


    const allStudents = async () => {
        await axios({
            method: 'get',
            url:
                'https://ckqb7yqnae.execute-api.us-east-1.amazonaws.com/prod/students',
            headers: { 'Content-Type': 'application/json' },

        })
            .then(res => {

                setResponseData2(res.data.students);
                console.log('la data2', responseData2)
                estudiantes(res.data.students);
               
            })
            .catch(err => console.log(err));
    };



    useEffect(() => {

        changueValor()


    }, [changueFiltro, filtro, responseData2]);


    return (
        <div>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor="demo-customized-select-native">Tipo Filtrado</InputLabel>
                <NativeSelect
                    id="demo-customized-select-tipo-filtro"
                    value={filtro}
                    onChange={changueFiltro}
                    input={<BootstrapInput />}
                >
                    <option aria-label="None" value="ok" />
                    <option value={'all'}>Todos los Estudiantes</option>
                    <option value={'cedula'}>Por Documento</option>
                    <option value={'personalizado'}>Personalizado</option>
                </NativeSelect>
            </FormControl>

            <FormControl className={classes.margin}>
                <InputLabel htmlFor="demo-customized-textbox-documento">Documento</InputLabel>
                <BootstrapInput value={documento} disabled={documentod} onChange={changueDocumento} id="demo-customized-textbox-documento" />
            </FormControl>

            <FormControl className={classes.margin}>

                <InputLabel id="demo-customized-textbox">Edad Inicial</InputLabel>
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={age1}
                    disabled={age1d}
                    onChange={changueEdad1}
                    input={<BootstrapInput />}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={14}>14</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={40}>40</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                </Select>
            </FormControl>

            <FormControl className={classes.margin}>
                <InputLabel id="demo-customized-select-label">Edad Final</InputLabel>
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={age2}
                    disabled={age1d}
                    onChange={changueEdad2}
                    input={<BootstrapInput />}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={18}>18</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={40}>40</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                </Select>
            </FormControl>


            <FormControl className={classes.margin}>
                <InputLabel htmlFor="demo-customized-textbox-matricula1">$ Matricula 1</InputLabel>
                <BootstrapInput value={matricula1} disabled={matricula1d} onChange={changueMatricula1} id="demo-customized-textbox-matricula1" />
            </FormControl>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor="demo-customized-textbox-matricula2">$ Matricula 2</InputLabel>
                <BootstrapInput value={matricula2} disabled={matricula2d} onChange={changueMatricula2} id="demo-customized-textbox-matricula2" />
            </FormControl>

            <FormControl className={classes.margin}>
                <InputLabel id="demo-customized-select-label-estrato">Estrato</InputLabel>
                <Select
                    labelId="demo-customized-select-label-estrato"
                    id="demo-customized-select-estrato"
                    value={estrato}
                    disabled={estratod}
                    onChange={changueEstrato}
                    input={<BootstrapInput />}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>

                </Select>
            </FormControl>
            <Button className="col-6" variant="contained" color="primary" onClick={() => allStudents()}>
                Filtrar Estudiantes
            </Button>


            {
                responseData2 != '' ? (
                    <>
                        <ReportesStudents data={responseData2} />
                    </>
                ) : (
                <>
                    <br></br>
                </>
            )
            }

        </div>
    
   

    );

}
export default FiltrosStudents;