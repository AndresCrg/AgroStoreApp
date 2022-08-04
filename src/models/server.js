require('dotenv').config();
const express = require('express');
const cors = require('cors');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.pathUsers = '/api/users';
		this.pathCredential = '/api/account';
		this.pathAuth = '/api/auth';
		this.pathProducts = '/api/products';
		this.middleware();
		this.routes();
	}

	middleware() {
		this.app.use(express.json());
		this.app.use(cors());
	}

	routes() {
		this.app.use(this.pathUsers, require('../routes/user-route'));
		this.app.use(this.pathCredential, require('../routes/credential-route'));
		this.app.use(this.pathAuth, require('../routes/auth-route'));
		this.app.use(this.pathProducts, require('../routes/product-route'))
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server listening on port ${this.port}`);
		});
	}
}

module.exports = Server;
