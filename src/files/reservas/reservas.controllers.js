const uuid = require('uuid')
const Plcs = require('../../models/plcs.models')

const Reservas = require('../../models/reservas.models')
const Users = require('../../models/users.models')

const getReservasBydate = async (fecha, hora) => {
    const data = await Reservas.findAll({
        where: { fecha, hora },
        include: [
            {
                model: Users,
                as: 'user',
                attributes: { exclude: ['password', 'role', 'email'] }
            },
            {
                model: Plcs,
                as: 'plc',
                atributes: ['id']
            }
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'userId']
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

const deleteReserva = async (id) => {
    const data = await Reservas.destroy({
        where: {
            id
        }
    })
    return data
}

const getReservaByPlc = async (plcName) => {
    const data = await Reservas.findAll(
        {
            // where: { name: plcName },
            // atributes: ['name'],
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: { exclude: ['password', 'role', 'email'] }
                },
                {
                    model: Plcs,
                    as: 'plc',
                    atributes: ['name'],
                    where: { name: plcName }
                }
            ]
        }
    )

    return data
}


const getReservasByUserId = async (userId) => {
    const data = await Reservas.findAll(
        {
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: { exclude: ['password', 'role', 'email'] },
                    where: { id: userId }
                }
            ]
        }
    )
    return data
}



module.exports = {
    getReservasBydate,
    getReservaByPlc,
    createReserva,
    deleteReserva,
    getReservasByUserId
}

