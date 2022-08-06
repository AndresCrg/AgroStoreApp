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

module.exports = {
	filterByPriceRange,
};
