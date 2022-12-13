const plcControllers = require('./plcs.controllers')

const getPlcs = (req, res) => {
    plcControllers
        .getPlcs()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

const addPlc = (req, res) => {
    const { name } = req.body

    if (name) {
        plcControllers
            .createPlc(name)
            .then((data) => {
                res.status(201).json(data)
            })
            .catch((err) => {
                res.status(400).json({ message: err.message })
            })
    }
    else {
        res.status(400).json({ message: 'Missing name', fields:{name:'string'} });
    }
}

module.exports={
    getPlcs,
    addPlc
}