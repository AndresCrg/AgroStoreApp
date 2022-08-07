const bcryptjs = require('bcryptjs');
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const createUser = async (req, res) => {
    const {full_name, document_type, document, address, city, phone_number, credentialId, password} = req.body;
    const salt = bcryptjs.genSaltSync();
    let passwordEncrypt = bcryptjs.hashSync(password, salt);
    const result = await prisma.user.create({
        data: {
            full_name,
            document_type,
            document,
            address,
            city,
            phone_number,
            credential: {
                create: {
                    email: credentialId,
                    password: passwordEncrypt,
                },
            },
        },
    });
    console.log(result);
    res.json({
        msg: 'Usuario creado exitosamente!',
        data: result
    });
};

const getUserById = async (req, res) => {
    const id = req.params.id;
    const result = await prisma.user.findUnique({
        where: {
            document: id,
        },
    });
    res.json({
        data: result,
    });
    console.log(result)
};

const getUsers = async (req, res) => {
    const results = await prisma.user.findMany({});
    res.json({
        success: 1,
        data: results,
    });
};

const updateUser = async (req, res = response) => {
    const document = req.params.id;
    const {credentialId} = req.body;
    const {...toUpdate} = req.body;
    let result;
    result = await prisma.user.update({
        where: {
            document,
        },
        data: toUpdate,
    });
    if (credentialId) {
        result = await prisma.user.update({
            where: {
                document,
            },
            data: {
                credential: {
                    update: {
                        email: credentialId,
                    },
                },
            },
        });
    }
    res.json({
        msg: 'Usuario actualizado exitosamente!',
        data: result
    });
};

module.exports = {
    getUserById,
    createUser,
    getUsers,
    updateUser,
    prisma,
};
