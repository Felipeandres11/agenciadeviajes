import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import moment from 'moment';
moment.suppressDeprecationWarnings = true;


import dotenv from 'dotenv'
dotenv.config({path: 'variables.env'})


//CONECTAR LA BASE DE DATOS
db.authenticate()
    .then( ()=> console.log('Base de datos conectada') )
    .catch( error => console.log(error) )
  


const app = express();

//DEFINIR PUERTO 
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

//AGREGAR BODY PARSER PARA LEER DATOS DEL FORMULARIO

app.use(express.urlencoded({extended: true}));


//habilitar template engine
app.set('view engine', 'pug');

// Obtener el año actual

app.use( (req,res, next) => {

    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";

    return next();
    
})


//definir carpeta publica 
app.use(express.static('public'));


//AGREGAR APP - soporta los diferentes verbos que existen PUT, PATCH, DELETE, POST, GET
app.use('/', router);



app.listen(port,host, ()=> {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})