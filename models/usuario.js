/* Este archivo es donde se crean las instancias de los 
usuarios definiendo los campos de los usuarios */

const mongoose = require('mongoose');

let usuarioSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        minlength: 5,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    }
});

let Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;