const { prisma } = require('./user-controller');

const filterByPriceRange = async (req, res) => {
	const lowerPrice = parseInt(req.params.lowerPrice);
	const higherPrice = parseInt(req.params.higherPrice);
	const results = await prisma.product.findMany({
		where: {
			AND: [
				{
					pricePerunit: {
						gte: lowerPrice,
					},
				},
				{
					pricePerunit: {
						lte: higherPrice,
					},
				},
			],
		},
	});
	res.json({
		data: results,
	});
};

const filterByUnits = async (req, res) => {
	const units = req.params.units;
	const results = await prisma.product.findMany({
		where: {
			units,
		},
	});
	res.json({
		data: results,
	});
};

module.exports = {
	filterByPriceRange,
	filterByUnits,
};
