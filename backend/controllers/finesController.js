const Fines = require('../models/finesModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

//get all finds
const getAllFines = async (req, res) => {
    try{
        const fines = await Fines.find()
        res.status(200).json(fines)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

//get fines for specific borrow id
const getFine = async(req,res)=>{
    const {user_id} = req.params

    try{
        const fines  = await Fines.find({user_id})
        res.status(200).json(fines)
    }catch(err){
        res.status(404).json({error: err.massage})
    }
}

//POST new fines
const createFines = async(req,res) => {
    const {user_id, borrow_id, amount} = req.body

    const user = await User.findOne({_id: user_id})
    if(!suer) res.status(400).json({error: "No such user registered"})

    user_name = user.fName + " " + user.lName

    //checking for empty fields
    let emptyValues = []
    if(!user_id) emptyValues.push(user_id)
    if(!borrow_id) emptyValues.push(borrow_id)
    if(!amount) emptyValues.push(amount)
    if(emptyValues.length > 0) res.status(400).json({error:'Please fill in all the field', emptyValues})

    try{
        const fines = await Fines.create({user_id, user_name, borrow_id, amount})
        res.status(201).json(fines)
    }catch(err){
        res.status.json(404)({error:err.massage})
    }
}

//detete finds
const deleteFines = async(req,res)=>{
    const {borrow_id} = req.params

    const fines = await Fines.findOneAndDelete({borrow_id})
    
    if(!fines) res.status(404).json({error:'No such finds are listed'})
    else res.status(200).json(fines)
}

const updateFine = async (req, res) => {
    const fine_id = req.params.id

    const amount = req.body.amount
    if(!amount) res.status(400).json({error: "Require a valid Amount to update the fine"})
    
    await Fines.findOneAndUpdate({_id: fine_id}, {amount})
        .then(result => res.status(200).json(result))
        .catch(() => res.status(400).json({error: "Failed to update the fine"}))
}

module.exports = {
    getAllFines,
    getFine,
    createFines,
    deleteFines,
    updateFine
}