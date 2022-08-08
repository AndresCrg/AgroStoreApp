require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'AgroStore Marketplace',
			description: 'Marketplace que permite conectar compradores de productos agricolas con los agricultores, eliminando los intermediarios',
			contact: {
				name: 'Brayan Andrés Cárdenas Rodríguez',
				email: 'brayan.cardenas@uptc.edu.co',
			},
			version: '1.0.0',
		},
		servers: [
			{
				url: 'http://localhost:3008',
			},
		],
	},
	apis: ['./src/routes/*.js'],
};

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.pathUsers = '/api/users';
		this.pathCredential = '/api/account';
		this.pathAuth = '/api/auth';
		this.pathProducts = '/api/products';
		this.pathFilters = '/api/filters';
		this.pathFiltersV2 = '/api/filtersV2';
		this.pathSalePromise = '/api/salePromises';
		this.pathSwaggerDoc = '/api/docs/dev';
		this.middleware();
		this.routes();
		this.app.use(cors());
	}

	middleware() {
		this.app.use(express.json());
		this.app.use(cors());
	}

	routes() {
		this.app.use(this.pathUsers, require('../routes/user-route'));
		this.app.use(this.pathCredential, require('../routes/credential-route'));
		this.app.use(this.pathAuth, require('../routes/auth-route'));
		this.app.use(this.pathProducts, require('../routes/product-route'));
		this.app.use(this.pathFilters, require('../routes/filter-route'));
		this.app.use(this.pathFiltersV2, require('../routes/filterV2-route'));
		this.app.use(this.pathSalePromise, require('../routes/sale-promises-route'));
		this.app.use(this.pathSwaggerDoc, swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server listening on port ${this.port}`);
		});
	}
}

module.exports = Server;
