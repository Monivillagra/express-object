const express = require('express');
const app = express();
const path = require('path');
const todos = require(path.join(__dirname, 'routes/todos'));

// const bodyParser = require('body-parser');

// app.use(bodyParser.json());
app.use(express.json());

/*Routes*/
app.use('/todos', todos);

// /todos -> todas las tareas diferenciadas por usuario V

// /todos?complete=false|true -> todas las tareas completas o no completas V

// /todos/nombre -> todas las tareas de ese usuario V

// /todos/nombre?complete=false|true -> todas las tareas de ese usuario que son false/true V

// /todos/nombre/id -> cambiar el estado de la tarea V

// /todos/nombre/add -> agregar tareas por nombre V

app.get('/', (req, res) => res.send('Bienvenido al ejercicio de pruebas'))

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000')
})