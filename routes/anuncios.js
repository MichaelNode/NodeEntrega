'use strict'

const express = require('express');
const router = express.Router();
const { query, validationResult } = require('express-validator/check');
var createError = require('http-errors');
const Anuncios = require('../models/Anuncios');

router.get('/', async (req,res,next) => {
	try{
		const tag = req.query.tag;
		const venta = req.query.venta;
		var nombre = req.query.nombre;
		const precio = req.query.precio;
		const limit = parseInt(req.query.limit);
		const skip = parseInt(req.query.skip);
		const fields = req.query.fields;
		const sort = req.query.sort;
		const filtro = {};
		if(req.query.nombre !== undefined){
			nombre  = new RegExp('^' + req.query.nombre, 'i');
		}
	

		
        
		if (tag) {
			filtro.tag = tag;
		}
		if (venta) {
			filtro.venta = venta;
		}
		if (nombre) {
			filtro.nombre = nombre;
		}
		
                                        
		var anuncios = await Anuncios.listar(filtro, limit, skip, fields,precio,sort);
		res.json({anuncios:  anuncios });
	
				

	} catch (err) {
		next(err);
	}  

});


router.get('/main/:page?', async (req,res,next) => {
	try{
		const tag = req.query.tag;
		const venta = req.query.venta;
		var nombre = req.query.nombre;
		const precio = '10-';
		const limit = parseInt(req.query.limit);
		const skip = parseInt(req.query.skip);
		const fields = req.query.fields;
		const sort = req.query.sort;
		const filtro = {};
		var perPage = 4
		var page =  req.params.page || 1
		var search = req.query.search;
		if(req.query.search !== undefined && req.query.nombre == undefined ){
			search = new RegExp('^' + req.query.search, 'i');
		}
		if(req.query.nombre !== undefined && req.query.search == undefined){
			nombre  = new RegExp('^' + req.query.nombre, 'i');
		}
		

	
        
		if (tag) {
			filtro.tag = tag;
		}
		if (venta) {
			filtro.venta = venta;
		}
		if (nombre) {
			filtro.nombre = nombre;
		}
		

		var anuncios = await Anuncios.listar(filtro, limit, skip, fields,precio,sort,search,page,perPage);
		var count = await Anuncios.Count(filtro, limit, skip, fields,precio,search);
		console.log(page)
		console.log(perPage)
		console.log(count)
		res.render('../views/index.ejs', {  anuncios: anuncios, current: page, pages: Math.ceil( count / perPage) });
	
				

	} catch (err) {
		next(err);
	}  

});



router.get('/:id', async (req, res, next) => {
	try {
		const _id = req.params.id;
		const anuncios = await Anuncios.findById(_id).exec();

		if(!anuncios){
			next(createError(404));
			return;
		}
	} catch (err) {
		next(err);
	}
});


router.post('/', [ query('precio').isNumeric().withMessage('debe ser numérico')], async (req, res , next) => {
	try {
		const datosAnuncios = req.body;
		validationResult(req).throw();
		const anuncio = new Anuncios(datosAnuncios);
		const anunciosSave = await anuncio.save();

		res.json({ success: true, result: anunciosSave});
	} catch (err) {
		next(err);
	}
});


router.put('/:id', async (req, res, next) => {
	try {
		const _id = req.params.id;
		const datosAnuncios = req.body;
		const anunciosUpdate = await Anuncios.findByIdAndUpdate(_id, datosAnuncios, { new: true }).exec();
		res.jason({ success: true, result: anunciosUpdate});
	} catch (err) {
		next(err);
	}
});


module.exports = router;