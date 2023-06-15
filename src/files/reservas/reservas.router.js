const router = require('express').Router()
const passport = require('passport')
const adminValidate = require('../../middlewares/role.middleware')

const reservaServices = require('./reservas.services')
require('../../middlewares/auth.middleware')(passport)

router.route('/')
    .get(reservaServices.getReservasBydate)
    .post(
        passport.authenticate('jwt', { session: false }),
        reservaServices.createReserva
    )

router.route('/:id')
    // .get(reservaServices.get)
    // .patch(
    //     passport.authenticate('jwt', { session: false }),
    //     adminValidate,
    //     userServices.patchUser
    // )
    .delete(
        passport.authenticate('jwt', { session: false }),
        adminValidate,
        reservaServices.deleteReserva
    )

router.route('/:name')
    .get(reservaServices.getReservasByPlc)

router.route('/user/:id')
    .get(reservaServices.getReservasByUserId)


module.exports = router