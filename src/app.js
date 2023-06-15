//? Dependencies
const express = require('express');
const db = require('./utils/database')
const cors=require('cors')

//? Files
const {port} = require('./config');
//* Routes
const userRouter=require('./files/users/users.router')
const zonasRouter=require('./files/plcs/plcs.router')
const reservasRouter=require('./files/reservas/reservas.router')
const authRouter=require('./auth/auth.router')
const initModels = require('./models/initModels')

//? Initial Configs
const app = express()

app.use(express.json())
app.use(cors('*'))

db.authenticate()
    .then(() => {
        console.log('Database Authenticated')
    })
    .catch(err => {
        console.log(err)
    })

db.sync()
    .then(() => {
        console.log('Database Synced')
    })
    .catch(err => {
        console.log(err)
    })

initModels()


app.get('/',(req, res) => {
    res.status(200).json({
        message: 'OK!',
        users: `localhost:${port}/api/v1/users`
    })
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/reservas',reservasRouter)
app.use('/api/v1/zonas',zonasRouter)


app.use('/api/v1/auth', authRouter)

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})

