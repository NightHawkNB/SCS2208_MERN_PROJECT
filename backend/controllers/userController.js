const User=require('../models/userModel')
const jwt=require('jsonwebtoken')//for authentication

//creating token
const createToken=(_id)=>{
    //jwt.sign takes 3 arguments {payload},SECRET string,{options}
    return jwt.sign({_id:_id},process.env.SECRET,{expiresIn:'1d'})
}


//signup
const signupUser=async(req,res)=>{
    const {email,password,userType}=req.body

    try{
        const user=await User.signup(email,password,userType)
        const token=createToken(user._id)
        res.status(200).json({email,userType,token})
    } catch (error){
        res.status(400).json({error:error.message})
    }
}

//login

const loginUser=async(req,res)=>{
    const {email,password}=req.body

    try{
        const user=await User.login(email,password)
        const {userType,_id}=user
        const token=createToken(_id)
        res.status(200).json({email,userType,token})

    }catch (error){
        res.status(400).json({error:error.message})
        
    }
}

module.exports={signupUser,loginUser}