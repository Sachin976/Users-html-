const express = require('express')
const path = require('path')
const User = require('../model/user')
const mongoose = require('mongoose')
const hbs = require('hbs')
const qs = require('qs')
const Authorization = require('../middleware/authorization')

const connectionURL = "mongodb+srv://Sachin97659:<password>@cluster0.edxeh.mongodb.net/Users?retryWrites=true&w=majority"
mongoose.connect(connectionURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})

const viewsDirectoryPath = path.join(__dirname,"../templates/views")
const binDirectoryPath = path.join(__dirname,"../bin")
const partialsPath = path.join(__dirname,"../templates/partials")
const app = express()
const port = 3000
app.set('view engine',"hbs")
app.set('views',viewsDirectoryPath)
hbs.registerPartials(partialsPath)
app.use(express.static(binDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Login"
    })
})

app.get('/signup',(req,res)=>{
    res.render('signup',{
        title:"Signup"
    })
})

app.get('/myProfile',Authorization,async (req,res)=>{
    res.render('profile',{
        title:"Profile",
        name:req.user.name,
        email:req.user.email,
        phone:req.user.phone,
        age:req.user.age
    })
})

app.get("/updateUser",Authorization,(req,res)=>{
    res.render('update',{
        title:"Update"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help"
    })
})

app.get('/createUser',async (req,res)=>{
    if(!req.query){
        return res.send({error:"First fill all the fields"})
    }
    const user = await new User(req.query)
    try{
        await user.save()
        const token = await user.getAuthorized()
        res.send({status:"User created",email:user.email,password:user.password,token})
    }catch(error){
        res.send({error})
    }
    
})
app.get('/loginUser',async (req,res)=>{
    if(!req.query){
        return res.send({error:"Login first"})
    }
    try{
        const user = await User.findOne({email:req.query.email,password:req.query.password})
        if(!user){
            throw new Error
        }
        const token = await user.getAuthorized()
        res.send({token})
    }catch(error){
        res.send({error:"Invalid credentials"})
    }
})

app.get('/logoutUser',Authorization,async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send({status:"You are logged out"})
    }catch(error){
        res.send({error})
    }
})

app.get('/updateUserData',Authorization,async (req,res)=>{
    let updates = Object.keys(req.query)
    const allowedUpdates = ["name","email","password","age","phone"]
    updates = updates.filter((update)=> {
        if(allowedUpdates.includes(update) && req.query[update] !== ''){
            return update
        }
    })
    try{
        const user = req.user
        updates.forEach((update)=> user[update] = req.query[update])
        await user.save()
        res.send({status:"Updated successfully"})
    }catch(error){
        res.send({error:"Some error occured"})
    }
})

app.get('/deleteUser',Authorization,async(req,res)=>{
    try{
        await req.user.remove()
        res.send({status:"User deleted"})
    }catch(error){
        res.send({error})
    }
})

app.listen(port,()=>{
    console.log("server is up on port" + port)
})