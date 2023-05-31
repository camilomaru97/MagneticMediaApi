const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./src/database/config');

//Servidor
const app = express();

//Cors
app.use(cors())

//Base de datos
dbConnection();

//Directorio publicas
app.use(express.static('public'))

// Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/ironllegada', require('./src/routes/ironLlegada.routes'));
app.use('/api/ironsalida', require('./src/routes/ironSalida.routes'));
app.use('/api/catalogo', require('./src/routes/catalogo.routes'));

//Escuchar peticiones
const server = app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})

module.exports = { app, server }
