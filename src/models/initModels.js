const Users = require('./users.models')
const Reservas = require('./reservas.models')
const Plcs = require('./plcs.models')

const initModels = () => {

    // una reserva le pertenece a un usuario
    Reservas.belongsTo(Users)

    // un usuario tiene muchas reservas
    Users.hasMany(Reservas)

    // una reserva tiene un plc
    Reservas.belongsTo(Plcs)

    // un PLC tiene muchas reservas
    Plcs.hasMany(Reservas)


}


module.exports = initModels