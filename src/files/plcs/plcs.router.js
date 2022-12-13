const router = require('express').Router()

// const {}=require('../reservas/reservas.services')
const plcServices = require('./plcs.services')

router.route('/')
    .get(plcServices.getPlcs)
    .post(plcServices.addPlc)

router.get('/:name/reservas')

module.exports = router