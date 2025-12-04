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


app.get('/equipo/:id', (req, res) => {
    res.sendFile(path.join('../frontend/', 'perfilEscuderia.html'));
});

app.get('/api/equipo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const equipo = equipos.find(e=>e.id===id);

    if(equipo){
        res.json(equipo);
    }
});


app.listen(PORT);
