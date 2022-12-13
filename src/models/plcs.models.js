const db = require('../utils/database')
const { DataTypes } = require('sequelize')

const Plcs = db.define('plcs', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false })

module.exports=Plcs