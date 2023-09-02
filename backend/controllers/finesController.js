const Fines=require('../models/finesModel')
const mongoose=require('mongoose')

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
const getFinesAid = async(req,res)=>{
    const {borrow_id} = req.params
    try{
        const fines  = await Fines.find({borrow_id:borrow_id})
        res.status(200).json(fines)
    }catch(err){
        res.status(404).json({error:err.massage})
    }
}

//POST new fines
const createFines = async(req,res)=>{
    const {user_id,borrow_id,amount}=req.body

    //checking for empty fields
    let emptyValues=[]
    if(!user_id)emptyValues.push(user_id)
    if(!borrow_id)emptyValues.push(borrow_id)
    if(!amount)emptyValues.push(amount)
    if(emptyValues.length>0){
        return res.status(400).json({error:'Please fill in all the field',emptyValues})
    }

    try{
        const fines = await Fines.create({user_id,borrow_id,amount})
        res.status(201).json(fines)
    }catch(err){
        res.status.json(404)({error:err.massage})
    }
}

//detete finds
const deleteFines = async(req,res)=>{
    const {borrow_id} = req.params

    //if(!mongoose.Type.objectId.isValid(borrow_id)){
    //    return res.status(404).json({error:'No such finds are listed'})
    //}

    const fines=await Fines.findOneAndDelete({borrow_id:borrow_id})
    
    if(!fines){
        return res.status(404).json({error:'No such finds are listed'})
    }
    res.status(200).json(fines)
}

module.exports = {
    getAllFines,
    getFinesAid,
    createFines,
    deleteFines
}