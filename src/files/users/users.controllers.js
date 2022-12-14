//? Dependencies
const { UUID } = require('sequelize')
const uuid = require('uuid')

const Users = require('../../models/users.models')
const { hashPassword } = require('../../utils/crypto')

const getAllUsers = async () => {
    // SELECT * from users
    const data = await Users.findAll({
        attributes:{exclude:['password']}
    })
    return data
}

const getUserById = async (id) => {
    const data = await Users.findOne({
        where: {
            id
        }
    })
    return data
}


const createUser = async (data) => {
    const newUser = await Users.create({
        id:uuid.v4(),
        name: data.name,
        ci:data.ci,
        email: data.email,
        password: hashPassword(data.password),

    })
    return newUser
}

const updateUser = async (id, data) => {
    const result = await Users.update(data, {
        where: {
            id
        }
    })
    return result
}

const deleteUser = async (id) => {
    const data = await Users.destroy({
        where: {
            id
        }
    })
    return data
}

//? Un servidor contiene la API
//? Otro servidor contiene la Base de Datos

const getUserByEmail = async(email) => {
    //? SELECT * FROM users where email = 'sahid.kick@academlo.com'//
    const data = await Users.findOne({
        where: {
            email
        }
    })
    return data
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail
}