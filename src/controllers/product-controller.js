const { convertToDate } = require('../helpers/convertToDate');
const { prisma } = require('./user-controller');

const createProduct = async (req, res) => {
	const { name, type, harvestDate, harvestLocation, units, quantityAvalible, pricePerunit, image, description } = req.body;
	const result = await prisma.product.create({
		data: {
			name,
			type,
			harvestDate: convertToDate(harvestDate),
			harvestLocation,
			units,
			quantityAvalible,
			pricePerunit,
			image,
			description,
		},
	});
	res.json({
		msg: 'Producto creado exitosamente',
		result,
	});
};

const getProductById = async (req, res) => {
	const id = req.params.id;
	const result = await prisma.product.findUnique({
		where: {
			id,
		},
	});
	res.json({
		data: result,
	});
};

const getAllProducts = async (req, res) => {
	const results = await prisma.product.findMany({});
	res.json({
		success: 1,
		data: results,
	});
};

const updateProduct = async (req, res) => {
	const id = req.params.id;
	const { ...toUpdate } = req.body;
	const result = await prisma.product.update({
		where: {
			id,
		},
		data: toUpdate,
	});

	res.json({
		msg: 'Producto actualizado exitosamente!',
		data: result,
	});
};

const getProductsByUser = async (req, res) => {
	const { userId, email } = req.body;
	const results = await prisma.product.findMany({
		where: {
			AND: [
				{
					userId,
				},
				{
					userId: {
						where: {
							credentialId: {
								where: {
									email,
								},
							},
						},
					},
				},
			],
		},
	});
	res.json({
		data: results,
	});
};

const deleteProduct = (req, res) => {};

module.exports = {
	createProduct,
	getProductById,
	getAllProducts,
	updateProduct,
	getProductsByUser,
	deleteProduct,
};
