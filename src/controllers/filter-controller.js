const { prisma } = require('./user-controller');

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

const filterByHarvestLocation = (req, res) => {
    const harvestLocation = req.params.harvestLocation;
	const results = await prisma.product.findMany({
		where: {
			harvestLocation,
		},
	});
	res.json({
		data: results,
	});
};

module.exports = {
	filterByTypeProduct,
	filterByHarvestDate,
	filterByHarvestLocation,
};
