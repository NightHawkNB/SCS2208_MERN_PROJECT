const User=require('../models/userModel')
const mongoose=require('mongoose')

//get user details
const getUserDetails=async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        //when given id in the req url parameter is not valid
        return res.status(404).json({error:'No such user is listed'})
    }
    const user=await User.findById(id)
    
    if(!user){//no book found
        return res.status(404).json({error:'No such user is listed'})
    }
    const userDetials={fName:user.fName,lName:user.lName,email:user.email,userType:user.userType}
    res.status(200).json(userDetials)
}
module.exports={
    getUserDetails
}