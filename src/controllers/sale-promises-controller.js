const {convertToDate} = require('../helpers/convertToDate');
const {prisma} = require('./user-controller');

const createSalePromise = async (req, res) => {
    const userSellerId = parseInt(req.params.userSellerId);
    const userBuyerId = parseInt(req.params.userBuyerId);
    const productId = parseInt(req.params.productId);
    const {date, statusSale, saleQuantity, pricePerUnit, total} = req.body;
    console.log("MY DATE:",date)
    console.log("MY status:",statusSale)
    console.log("MY quan:",saleQuantity)
    console.log("MY pripunit:",pricePerUnit)
    console.log("MY total:",total)
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
            date: convertToDate(date.toString().split("T")[0]),
            statusSale,
            saleQuantity,
            pricePerUnit,
            total
        },
    });
    res.json({
        msg: 'Promesa de compra/venta creada exitosamente!',
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

const getPromiseByUser = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const role = req.params.role;
    let results = {};
    if (role === 'seller') {
        results = await prisma.salePromise.findMany({
            where: {
                userSellerId: userId,
            },
        });
    } else if (role === 'buyer') {
        results = await prisma.salePromise.findMany({
            where: {
                userBuyerId: userId,
            },
        });
    }
    res.json({
        data: results,
    });
};

const setStatePromise = async (req, res) => {
	const id = req.params.id;
	const newState = req.params.newState;
	const result = await prisma.salePromise.update({
		where: {
			id,
		},
		statusSale: newState,
	});
	res.json({
		msg: 'Estado de la compra/venta actualizada correctamente',
		data: result,
	});
};

module.exports = {
    createSalePromise,
    getAllSalePromises,
    getPromiseByUser,
	  setStatePromise,
};
