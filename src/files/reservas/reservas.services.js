const reservasControllers = require('./reservas.controllers')

const getReservasBydate = (req, res) => {
    // localhost:9000/api/v1/reservas?fecha=aaaa-mm-dd&hora=hh:mm
    const fecha = req.query.fecha
    const hora = req.query.hora
    reservasControllers.getReservasBydate(fecha, hora)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const createReserva = (req, res) => {
    const userId = req.user.id
    const { fecha, hora, plcId } = req.body
    if (fecha && hora && plcId) {
        reservasControllers.createReserva({ fecha, hora, userId, plcId })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    }
    else {
        res.status(400).json({
            message: 'Missing Data',
            fields: {
                fecha: 'aaaa-mm-dd',
                hora: 'hh:mm',
                plcId: 'integer'
            }
        })
    }
}

const getReservasByPlc = (req, res) => {
    const plcName = req.params.name
    reservasControllers.getReservaByPlc(plcName)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => { res.status(400).json({ message: err.message }) })
}

const getReservasByUserId = (req, res) => {
    const userId = req.params.id
    reservasControllers.getReservasByUserId(userId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => { res.status(400).json({ message: err.message }) })
}

const deleteReserva = (req, res) => {
    const id = req.params.id;
    reservasControllers
        .deleteReserva(id)
        .then((data) => {
            if (data) {
                res.status(204).json();
            } else {
                res.status(404).json({ message: "Invalid ID" });
            }
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        })
}


module.exports = {
    getReservasBydate,
    getReservasByPlc,
    createReserva,
    deleteReserva,
    getReservasByUserId
}