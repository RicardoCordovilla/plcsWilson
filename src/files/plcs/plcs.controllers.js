const Plcs=require('../../models/plcs.models')

const getPlcs=async()=>{
    const data=await Plcs.findAll()
    return data
}

const createPlc=async(name)=>{
    const data =await Plcs.create({name})
    return data
}

module.exports={
    createPlc,
    getPlcs
}