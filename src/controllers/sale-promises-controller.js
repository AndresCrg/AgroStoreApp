const { convertToDate } = require('../helpers/convertToDate');
const { prisma } = require('./user-controller');

const createSalePromise = async (req, res) => {
	const userSellerId = parseInt(req.params.userSellerId);
	const userBuyerId = parseInt(req.params.userBuyerId);
	const productId = parseInt(req.params.productId);
	const { date, statusSale, saleQuantity, pricePerUnit, total } = req.body;
	const result = await prisma.salePromise.create({
		data: {
			seller: {
				connect: {
					id: userSellerId,
				},
			},
			buyer: {
				connect: {
					id: userBuyerId,
				},
			},
			product: {
				connect: {
					id: productId,
				},
			},
			date: convertToDate(date),
			statusSale,
			saleQuantity,
			pricePerUnit,
			total,
		},
	});
	res.json({
		msg: 'Promesa de venta creada exitosamente!',
		data: result,
	});
};

module.exports = {
	createSalePromise,
};
