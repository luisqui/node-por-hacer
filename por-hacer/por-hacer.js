const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json',data, (err)=> {
        if (err) {
            throw new Error('No se pudo grabar', err)
        }
    })
}

const cargarDB = () => {
    try {
        
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = []
    }
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion,completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(x => x.descripcion === descripcion)

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true
    } else{
        return false
    }
}

const borrar = (descripcion) => {

    cargarDB();

    let newArr = listadoPorHacer.filter(tarea => tarea.descripcion != descripcion);

    console.log('newArr', newArr)
    if(listadoPorHacer.length === newArr.length){
        return false;
    } else {
        listadoPorHacer = newArr
    
        guardarDB();
        return true;
    }

    return true;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}