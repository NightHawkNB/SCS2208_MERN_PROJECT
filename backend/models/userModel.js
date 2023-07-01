const mongoose=require('mongoose')
const schema=mongoose.Schema
const bcrypt=require('bcrypt')//for hashing passwords
const validator=require('validator')//to validate mails and passwords

const userSchema=new schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{//admin,librarian or normal user
        type:String,
        required:true
    }
})

//signup static method
userSchema.statics.signup=async function (email,password,userType){
    
    if(!email||!password||!userType){
        throw Error("All Fields must be filled!")
    }
    if(!validator.isEmail(email)){
        throw Error("Enter a valid email")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Plase enter a strong password")
    }
    
    const exists=await this.findOne({email})
    
    if(exists){
        throw Error("Email is already in use!")
    }

    //hashing
    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)
    
    const user=await this.create({email:email,password:hash,userType:userType})
   
    return user
}

//login method
userSchema.statics.login=async function(email,password){
    if(!email||!password){
        throw Error("All fields must be filled!")
    }

    const user=await this.findOne({email})
    if(!user){
        throw Error("Invalid credentials!")
    }

    const match=await bcrypt.compare(password,user.password)//compare the plain text password and hashed one
    //bcrypt pull out the salt of the hash and hash the given plain password with the pulled salt and compare
    if(!match){
        throw Error("Invalid credentials!")
    }

    return user
}

module.exports=mongoose.model('User',userSchema)