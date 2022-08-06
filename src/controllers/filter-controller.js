const { prisma } = require('./user-controller');
const { testDate, convertToDate, test2 } = require('../helpers/convertToDate');

const filterByTypeProduct = async (req, res) => {
	const typeProduct = req.params.typeProduct;
	const results = await prisma.product.findMany({
		where: {
			type: typeProduct,
		},
	});
	res.json({
		data: results,
	});
};

const filterProductsByDateToday = async (req, res) => {
	const harvestDate = new Date(req.body.harvestDate);
	const results = await prisma.product.findMany({
		where: {
			harvestDate,
		},
	});
	res.json({
		data: results,
	});
};

module.exports = {
	filterByTypeProduct,
	filterProductsByDateToday,
};
