const {request, response} = require("express");
const {prisma} = require('./user-controller')

const patchAccount = async (req = request, res = response) => {
    const email = req.params.email;
    const result = await prisma.credential.update({
        where: {
            email,
        },
        data: {
            state: 'D',
        },
    });
    res.json({
        msg: 'Empleado borrado exitosamente!',
        state: result,
    });
}

module.exports = {
    patchAccount
}