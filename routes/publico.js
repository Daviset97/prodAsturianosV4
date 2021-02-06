/*
Este archivo se usa para poder configurar la parte 
pública para que puedas ver los productos en la parte pública
al igual que añadir los comentarios en los productos
*/

const express = require('express');

let Producto = require(__dirname + '/../models/producto.js');
let router = express.Router();

// Renderización de la vista index y ver la vista principal
router.get('/', (req, res) => {
    res.render('publico_index');
});

/* Búsqueda de todos los productos cuyo nombre contenga 
el texto que se pasa por el cuerpo de la petición */
router.get('/buscar', (req, res) => {
    if (req.query.buscar !== '') {
        Producto.find({ nombre: new RegExp(req.query.buscar, 'i') }).then(resultado => {
            if (resultado.length > 0)
                res.render('publico_index', { productos: resultado });
            else
                res.render('publico_index', { error: "No se encontraron productos" });
        }).catch(error => {
            res.render('publico_error');
        });
    } else {
        res.redirect('/');
    }
});

// Detalle del producto que se tiene en la base de datos
router.get('/producto/:id', (req, res) => {
    Producto.findById(req.params.id).then(resultado => {
        if (resultado)
            res.render('publico_producto', { producto: resultado });
        else
            res.render('publico_error', { error: "Producto no encontrado" });
    }).catch(error => {
        res.render('publico_error');
    });
});

// Añadir comentario al producto
router.post('/comentarios/:id', (req, res) => {
    Producto.findById(req.params.id).then(producto => {
        producto.comentarios.push({
            nombreUsuario: req.body.nombreUsuario,
            comentario: req.body.comentario
        });
        producto.save().then(resultado => {
            res.render('publico_producto', { producto: resultado });
        });
    }).catch(error => {
        res.render('publico_error');
    });
});

module.exports = router;