const db = require('../utils/database')
const { DataTypes } = require('sequelize')
const Users = require('./users.models')
const Plcs = require('./plcs.models')


const Reservas = db.define('reservas', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
            key: 'id',
            model: Users
        }
    },

    plcId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        field:'plc_id',
        references:{
            key:'id',
            model:Plcs
        }
    }

},{timestamps:true})

module.exports=Reservas