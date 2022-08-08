const { prisma } = require('../controllers/user-controller');

/**
 *
 * Employees
 */

const documentExist = async (id = -1) => {

	const existDocument = await prisma.user.findFirst({ where: { id: parseInt(id) } });
	if (existDocument) {
		throw new Error(`El documento: ${id}, ya está registrado!`);
	}
};

const documentExistById = async (id = -1) => {
	const existDocument = await prisma.user.findUnique({
		where: { id: parseInt(id)},
	});
	if (!existDocument) {
		throw new Error(`El documento ${id} no esta registrado!`);
	}
};

const emailExist = async (email = '') => {
	const credentialId = email
	const existEmail = await prisma.user.findFirst({ where: { credentialId } });
	if (existEmail) {
		throw new Error(`El correo: ${email}, ya está registrado!`);
	}
};

/**
 *
 * Credential
 */

const emailExistCredential = async (email = '') => {
	const existEmail = await prisma.credential.findFirst({ where: { email } });
	if (existEmail) {
		throw new Error(`El correo: ${email}, ya está registrado!`);
	}
};

const emailDoesNotRegistry = async (email = '') => {
	const existEmail = await prisma.credential.findFirst({
		where: { email },
	});
	if (!existEmail) {
		throw new Error(`Correo o contraseña incorrectas - Correo`);
	}
};

module.exports = {
	documentExist,
	emailExist,
	documentExistById,
	emailDoesNotRegistry,
	emailExistCredential,
};
