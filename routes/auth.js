/* Este archivo maneja la parte del login y logout, trata
las sesiones de cada usuario que hay en la base de datos */

const express = require('express');
const encriptado = require("crypto-js/sha256");
// Inicializar Express
let router = express.Router();
let Usuario = require(__dirname + '/../models/usuario.js');

// Vista de login
router.get('/login', (req, res) => {
    res.render('auth_login');
});

// Proceso de login (obtener credenciales y cotejar en la base de datos)
router.post('/login', (req, res) => {
    Usuario.find({ login: req.body.login, password: encriptado(req.body.password).toString() }).then(resultado => {
        if (resultado.length > 0) {
            req.session.login = resultado;
            res.redirect('/admin');
        } else {
            res.render('auth_login', { error: "Usuario incorrecto" });
        }
    }).catch(error => {
        res.render('admin_error');
    });
});

// Ruta para logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;