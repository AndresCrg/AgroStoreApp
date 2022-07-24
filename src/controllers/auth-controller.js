const bcryptjs = require('bcryptjs');
const { prisma } = require('./user-controller');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res) => {
	const { email, password } = req.body;
	const accountUser = await prisma.credential.findFirst({
		where: { email },
	});

	if (!accountUser) {
		return res.status(404).json({
			msg: 'Correo o contraseña incorrectas - correo',
		});
	}

	const validatePassword = bcryptjs.compareSync(password, accountUser.password);
	if (!validatePassword) {
		return res.status(404).json({
			msg: 'Correo o contraseña incorrectas! - password',
		});
	}

	if (accountUser.state == 'D' || accountUser.state == 'B') {
		return res.status(404).json({
			msg: 'Cuenta no exite o está bloqueada',
		});
	}

	const token = await generateJWT(accountUser.id, accountUser.email);

	res.json({
		token
	});
};

module.exports = {
	login,
};