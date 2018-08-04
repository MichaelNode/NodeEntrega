
'use strict'

require('dotenv').config();

const readline = require('readline');
const anuncios = require('./data/anuncios.json').anuncios;
const usuario = require('./data/usuario.json').usuario;
const conn = require('./lib/connectMongoose');
const Anuncios = require('./models/Anuncios');
const Usuarios = require('./models/Usuario');

conn.once('open', async () => {
	try{
		const response = await askUser('Estas seguro de eliminar el contenido de la base de datos? (No)');
		if(response.toLowerCase() !== 'si') {
			console.log('Proceso cancelado');
			process.exit();
		}
		await initAnuncios(anuncios);
		process.exit();
	} catch(err) {
		console.log('Hubo un error', err);
		process.exit(1);
	}
});


function askUser(question){
	return new Promise((resolve) => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		rl.question(question, function(answer){
			rl.close();
			resolve(answer);
		});
	});
}


async function initAnuncios(anuncios) {
	const deleted = await Anuncios.deleteMany();
	console.log(`Eliminados ${deleted.n} anuncios.`);
	const inserted = await Anuncios.insertMany(anuncios);
	console.log(`Insertados ${inserted.length} anuncios.`);
	const deletedU = await Usuarios.deleteMany();
	console.log(`Eliminados ${deletedU.n} usuarios.`);
	const insertedU = await Usuarios.insertMany(usuario);
	console.log(`Insertados ${insertedU.length} usuarios.`);
}






