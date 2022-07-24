const {request, response} = require('express')
const bcryptjs = require('bcryptjs')
const { PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const createUser = async (req = request, res) => {
    const { fullName, documentType, document, address, city, phoneNumber, email, password } = req.body;
    const salt = bcryptjs.genSaltSync();
    let passwordEncrypt = bcryptjs.hashSync(password, salt);
    const result = await prisma.user.create({
        data: {
            full_name: fullName,
            document_type: documentType,
            document,
            address,
            city,
            phone_number: phoneNumber,
            credential: {
                create:{
                    email,
                    password: passwordEncrypt
                }
            },
        },
    });
    console.log(result);
    res.json({
        msg: 'Empleado creado exitosamente!',
    });
}

const getUserById = async (req = request, res) => {
    const id = req.params.id
    const result = await prisma.user.findUnique({
        where:{
            document: id
        }
    })
    res.json({
        user: result
    })
}

const getUsers = async (req = request, res) => {
    const results = await prisma.user.findMany({})
    res.json({
        user: results
    })
}

const updateUser = async (req = request, res = response) => {
    const document = req.params.id;
    const { ...toUpdate } = req.body;
    const result = await prisma.user.update({
        where: {
            document,
        },
        data: toUpdate,
    });
    res.json({
        msg: 'Empleado actualizado exitosamente!',
        result
    });
    console.log(result);
};

module.exports = {
    getUserById,
    createUser,
    getUsers,
    updateUser,
}