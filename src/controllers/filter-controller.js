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

module.exports = {
	filterByTypeProduct,
};
