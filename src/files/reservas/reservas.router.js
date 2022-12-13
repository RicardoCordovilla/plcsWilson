const router = require('express').Router()
const passport = require('passport')

const reservaServices = require('./reservas.services')
require('../../middlewares/auth.middleware')(passport)

router.route('/')
    .get(reservaServices.getReservasBydate)
    .post(
        passport.authenticate('jwt', { session: false }),
        reservaServices.createReserva
    )

router.route('/:name')
    .get(reservaServices.getReservasByPlc)

module.exports = router