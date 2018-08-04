'use strict'

const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
	nombre: String,
	password: String
});


const Anuncio = mongoose.model('usuario', usuarioSchema);
module.exports = Anuncio;