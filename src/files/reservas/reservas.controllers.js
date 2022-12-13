const uuid = require('uuid')
const Plcs = require('../../models/plcs.models')

const Reservas = require('../../models/reservas.models')
const Users = require('../../models/users.models')

const getReservasBydate = async (fecha,hora) => {
    const data = await Reservas.findAll({
        where:{fecha,hora},
        include: [
            {
                model: Users,
                as: 'user',
                attributes:{exclude:['password','role','email']}
            },
            {
                model: Plcs,
                as: 'plc',
                atributes: ['id']
            }
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'plcId','id','userId']
        }
    })
    return data
}

const createReserva = async (data) => {
    const response = await Reservas.create({
        id: uuid.v4(),
        fecha: data.fecha,
        hora: data.hora,
        userId: data.userId,
        plcId: data.plcId
    })
    return response
}

const getReservaByPlc = async (plcName) => {
    const data = await Reservas.findAll(
        {
            where: { plc: { name: plcName } },
            atributes: ['name'],
            include: [
                {
                    model: Users,
                    as: 'users',
                    atributes: ['name', 'ci']
                },
                {
                    model: Plcs,
                    as: 'plcs',
                    atributes: ['name']
                }
            ]
        }
    )

    return data
}

module.exports = {
    getReservasBydate,
    getReservaByPlc,
    createReserva
}

