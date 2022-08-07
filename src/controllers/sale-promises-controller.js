const { calculateTotal } = require('../helpers/calculateTotalSalePromise');
const { convertToDate } = require('../helpers/convertToDate');
const { prisma } = require('./user-controller');

const createSalePromise = async (req, res) => {
	const userSellerId = req.params.userSellerId;
	const userBuyerId = req.params.userBuyerId;
	const productId = req.params.productId;
	const { date, statusSale, saleQuantity, pricePerUnit } = req.body;
	const result = await prisma.salePromise.create({
		userSellerId,
		userBuyerId,
		productId,
		date: convertToDate(date),
		statusSale,
		saleQuantity,
		pricePerUnit,
		total: calculateTotal(saleQuantity, pricePerUnit),
	});
	res.json({
		msg: 'Promesa de venta creada exitosamente!',
		data: result,
	});
};

module.exports = {
	createSalePromise,
};
