const jwt = require('jsonwebtoken')
const User = require('../model/user')

const Authorization = async (req,res,next)=>{
    try{
        const token = req.query.token
        const decodedToken = jwt.verify(token,"&%*&&*")
        const user = await User.findOne({_id:decodedToken._id,"tokens.token":token})
        console.log(user)
        if(!user){
            throw new Error("Please login first")
        }
        req.token = token
        req.user = user
        next() 
    }catch(error){
        res.send({error:"Please login first"})
    }
    
}

module.exports = Authorization