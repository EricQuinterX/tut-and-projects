const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

// const indexRoutes = require('./routes');
const tasksRoutes = require('./routes/tasks');

/* ---------  settings  --------------- */
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs'); // procesa las vistas que quiero renderizar hacia el cliente
app.set('views', path.join(__dirname, 'views')); // establesco donde esta la carpeta de las vistas al ejs

/* middlewares: funciones que se ejecutan antes de recibir la informacion de los clientes. */
app.use(cors()); 
app.use(express.json()); // recibe del del cliente json
app.use(express.urlencoded({extended: false})); // recibe campos de formularios

/* ------- ROUTES ---------- */
//app.use(indexRoutes); // uso las rutas definidas en el archivo.
app.use('/api', tasksRoutes);

/* ------- Static Files ---------- */
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port')); 
})