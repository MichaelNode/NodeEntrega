'use strict'

const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
	nombre: String,
	venta: Boolean,
	precio: Number,
	foto: String,
	tags: [String]
});

anuncioSchema.statics.listar = function(filtro,limit, skip, fields,precio,sort,search,pages,perPage){
	
	var query = Anuncio
	console.log(search)
	console.log(filtro.nombre)
	if(search !== undefined){
		console.log('entro en la lista con filtros')
		query = Anuncio.find({nombre: search},filtro)
	} else{
		console.log(filtro)
		query = Anuncio.find(filtro) 
	}
	if(precio === '10-'){
		query = query.find({precio: { '$gte':'10' } });	
	} else if(precio === '10-50'){
		query = query.find({precio: { '$gte': '10', '$lte': '50' }});	
	} else if(precio === '-50'){
		query = query.find({precio: { '$lte':'50' } });	
	}
	if(pages !== undefined && perPage !== undefined){
		query.skip((perPage * pages) - perPage);
		query.limit(perPage)
	}	
	query.select(fields);
	query.sort(sort);
	return query.exec();
}

anuncioSchema.statics.Count = function(filtro,limit, skip, fields,precio,search){
	
	var query = Anuncio
	console.log(filtro.nombre)
	if(search !== undefined){
		query = Anuncio.find({nombre: search},filtro)
	} else{
		query = Anuncio.find(filtro) 
	}
	if(precio === '10-'){
		query = query.find({precio: { '$gte':'10' } });	
	} else if(precio === '10-50'){
		query = query.find({precio: { '$gte': '10', '$lte': '50' }});	
	} else if(precio === '-50'){
		query = query.find({precio: { '$lte':'50' } });	
	}

	query.select(fields);
	return query.count().exec();
}

const Anuncio = mongoose.model('anuncio', anuncioSchema);
module.exports = Anuncio;