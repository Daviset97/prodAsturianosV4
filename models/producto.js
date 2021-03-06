/* Este archivo es donde se crean las instancias de los 
productos definiendo los campos de los productos y los comentarios */
const mongoose = require('mongoose');

let comentarioSchema = new mongoose.Schema({
    nombreUsuario: {
        require: true,
        type: String,
        trim: true
    },
    comentario: {
        type: String,
        require: true,
        minlength: 5,
        trim: true
    }
});

let productoSchema = new mongoose.Schema({
    nombre: {
        required: true,
        type: String,
        minlength: 3,
        trim: true
    },
    precio: {
        required: true,
        type: Number,
        min: 1
    },
    descripcion: {
        required: true,
        type: String,
        trim: true
    },
    imagen: {
        type: String,
        required: false,
        trim: true
    },
    comentarios: [
        comentarioSchema
    ]
});

let Producto = mongoose.model('producto', productoSchema);

module.exports = Producto;