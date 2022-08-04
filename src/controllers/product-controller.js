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

module.exports = {
	createProduct,
};
