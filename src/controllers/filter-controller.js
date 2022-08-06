const { prisma } = require('./user-controller');
const { formatDate, convertToDate } = require('../helpers/convertToDate');

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

const filterByHarvestDate = async (req, res) => {
	const harvestDate = req.params.harvestDate;
	const results = await prisma.product.findMany({
		where: {
			harvestDate,
		},
	});
	res.json({
		data: results,
	});
};

const filterProductsByDateToday = async (req, res) => {
	const today = req.params.today;
	const results = await prisma.product.findMany({
		where: {
			harvestDate: convertToDate(today),
		},
	});
	res.json({
		data: results,
	});
};

module.exports = {
	filterByTypeProduct,
	filterByHarvestDate,
	filterProductsByDateToday,
};
