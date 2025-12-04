const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../frontend')));



const equipos = require('./equipos.json')


//devuelve html de equipos
//como html tiene datos.js linkeado, tambien se lo trae
app.get('/equipos',(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend/equipos2.html'));
});


//api para trabajar con el JSON
app.get('/api/equipos', async (req,res) =>{
    res.json(equipos);
});


app.get('/equipos/:id', (req, res) => {
    const id = req.params.id;
    console.log("ID recibido en backend: ", id);
    const equipo = equipos.find(e => e.id === id);
    
    if (equipo) {
        res.sendFile(path.join(__dirname, '../frontend/perfilEscuderia.html'));
    } else {
        res.redirect('/');
    }
});

app.get('/api/equipos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const equipo = equipos.find(e=>e.id===id);

    if(equipo){
        res.json(equipo);
    } else {
        res.status(404).json({error: 'Equipo no encontrado'});
    }
});


app.use((req, res) => {
    res.status(404).send(`
        <h1>404 - Página no encontrada</h1>
        <p>La ruta <strong>${req.url}</strong> no existe.</p>
        <a href="/equipos">Ir a la lista de equipos</a>
    `);
});

app.listen(PORT);
