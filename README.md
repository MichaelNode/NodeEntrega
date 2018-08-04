
# Práctica del curso de Fundamentos Node.js - NodeApi

---

API desarrollada con **NODE.JS** para proporcionar información sobre anuncio, tanto di tipo ventas como búsqueda de productos.

**NODEAPI** : para obtener información de la API se debe hacer una petición GET en la siguiente ruta:

<http://localhost:3000/apiAnuncio>

Esta ruta permite los siguientes parámetro para obtener la información:

- tags
- venta
- nombre
- precio
- limit
- skip
- sort

ej: <http://localhost:3000/apiAnuncio?tags=mobile&venta=false&nombre=ip&precio=50-&limit=2&sort=precio>


**NODEAPI**: cuenta con un ruta(<http://localhost:3000/apiAnuncio/main>) donde responde un ejs con la información obtenida, además de contar con un buscador de nombre del producto, esta ruta se pueden aplicar los parámetros anteriormente mencionado.


ej : <http://localhost:3000/apiAnuncio/main?tags=mobile&venta=false&nombre=ip&precio=50-&limit=2&sort=precio>


## Proceso de instalación 

## Instalación
Ejecuta el siguiente comando para instalar todas las dependencias que necesita APINODE

```shell
npm install
```

Copia .env.example a .env y revisa el valor.

## Base de Datos

Para inicializar la Base de Datos:

```shell
npm run install_db
```

## Ejecución

Para ejecutar la aplicación en producción usa:

```shell
npm start
```


## Desarrollo

Para ejecutar la aplicación en desarrollo usa:

```shell
npm run dev
```
