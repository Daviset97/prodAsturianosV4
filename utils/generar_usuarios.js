// Archivo que se debe ejecutar para crear los usuarios en la base de datos para poder hacer el login

const mongoose = require('mongoose');
const Usuario = require(__dirname + '/../models/usuario');
const encriptado = require("crypto-js/sha256");

mongoose.connect('mongodb://localhost:27017/ProdAsturianosV3');
Usuario.collection.drop();
// Los usuarios por defecto fallan y me he creado uno porque no tienen los requisitos mínimos de longitud mínima

// let usu1 = new Usuario({
//     login: 'may',
//     password: encriptado('1234').toString()
// });
// usu1.save();

// let usu2 = new Usuario({
//     login: 'nacho',
//     password: encriptado('5678').toString()
// });
// usu2.save();

let usu3 = new Usuario({
    login: 'david',
    password: encriptado('12345678').toString()
});
usu3.save();