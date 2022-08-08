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

const getAllSalePromises = async (req, res) => {
	const results = await prisma.salePromise.findMany({});
	res.json({
		success: 1,
		data: results,
	});
};

const getSalePromiseByUser = async (req, res) => {
	const userId = parseInt(req.params.userId);
	const results = await prisma.salePromise.findMany({
		where: {
			OR: [
				{
					userSellerId: userId,
				},
				{
					userBuyerId: userId,
				},
			],
		},
	});
	res.json({
		data: results,
	});
};

module.exports = {
	createSalePromise,
	getAllSalePromises,
	getSalePromiseByUser,
};
