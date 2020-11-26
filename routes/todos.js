const express = require('express');
const router = express.Router();
// const app = express();
const { datos, blabla } = require('../utils/datos');

router.get('/', (req, res) => {
    const { complete } = req.query
    var array = [];
    if (complete === 'false' || complete === 'true') {
        for (const key in datos) {
            const filter = datos[key].filter(el => el.complete.toString() === complete) //query complete='false' || complete='true'
            if (filter.length > 0) {
                array.push(filter);
            }
        }
        return res.json(array);
    }
    return res.json(datos);
})

router.get('/:nombre', (req, res) => {
    const { nombre } = req.params;
    const { complete } = req.query;
    for (const key in datos) {
        if (key === nombre) {
            if (complete === 'true' || complete === 'false') {
                const filter = datos[key].filter(el => el.complete.toString() === complete)
                if (filter.length > 0) {
                    res.json(filter);
                } else {
                    res.status(200).send('Este usuario no tiene mas tareas del tipo ' + complete)
                }
            }
            return res.json(datos[key])
        }
    }
    return res.sendStatus(404);
})

router.post('/:nombre/add', (req, res) => {
    const { title } = req.body
    const { nombre } = req.params // tano
    for (const key in datos) {
        if (key === nombre) { //1ra vez: key->nacho !== tano || 2da vez: key->tano === tano \ id = datos[tano].length(3) + 1
            // const id = datos[key].length + 1
            const id = datos[key].reduce((acc, curr) => {
                return (acc < curr.id) ? curr.id : acc
            }, 0) + 1;
            const response = {
                id,
                title,
                complete: false
            }
            datos[key].push(response)
            return res.json(response);
        }
    }
    return res.sendStatus(404);
    // return res.status(404).send('Not Found');
})

router.put('/:nombre/:id', (req, res) => {
    const { id, nombre } = req.params;
    for (const key in datos) {
        if (key === nombre) {
            let tarea = {};
            datos[key].forEach(el => {
                if (el.id === parseInt(id)) { //query nos da strings
                    el.complete = !el.complete;
                    tarea = el;
                }
            })
            return res.json(tarea);
        }
    }
    return res.sendStatus(404);

})

module.exports = router;