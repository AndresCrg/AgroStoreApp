const bcryptjs = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createUser = async (req, res) => {
	const { full_name, document_type, document, address, city, phone_number, email, password } = req.body;
	const salt = bcryptjs.genSaltSync();
	let passwordEncrypt = bcryptjs.hashSync(password, salt);
	const result = await prisma.user.create({
		data: {
			full_name,
			document_type,
			document,
			address,
			city,
			phone_number,
			credential: {
				create: {
					email,
					password: passwordEncrypt,
				},
			},
		},
	});
	console.log(result);
	res.json({
		msg: 'Usuario creado exitosamente!',
	});
};

const getUserById = async (req, res) => {
	const document = req.params.id;
	const result = await prisma.user.findUnique({
		where: {
			document,
		},
	});
	res.json({
		data: result,
	});
};

const getUsers = async (req, res) => {
	const results = await prisma.user.findMany({});
	res.json({
		success: 1,
		data: results,
	});
};

const updateUser = async (req, res = response) => {
	const document = req.params.id;
	const { email } = req.body;
	const { ...toUpdate } = req.body;
	let result;

	if (!email) {
		result = await prisma.user.update({
			where: {
				document,
			},
			data: toUpdate,
		});
	} else {
		result = await prisma.user.update({
			where: {
				document,
			},
			data: {
				credentialId: {
					update: {
						email,
					},
				},
			},
		});
	}
	res.json({
		msg: 'Usuario actualizado exitosamente!',
		result,
	});
	console.log(result);
};

module.exports = {
	getUserById,
	createUser,
	getUsers,
	updateUser,
	prisma,
};
