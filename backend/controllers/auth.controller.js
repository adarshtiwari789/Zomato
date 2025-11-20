const { usermodel } = require("../model/user.model")
const foodpartner = require("../model/food-partner.model")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")

const userRegister = async function (req, res) {
    const { email, password, username } = req.body
    const userexsist = await usermodel.findOne({ email })
    if (userexsist) {
        return res.status(201).json({
            "message": "user alredy exsist"
        })
    }

    const hashPass = await bcrypt.hash(password , 10)

    const user = await usermodel.create({
        email: email,
        password: hashPass,
        username: username
    })
        const token = jwt.sign({_id : user._id} , 'shh')
        res.cookie("token" , token)
        return res.status(201).json({
            "message": "user created "
        })

      
}
const userLogin = async function (req, res){
    const {email , password } = req.body ;
    
    const user = await usermodel.findOne({email})
    
    if (!user) {
        return res.status(301).json({
            message : "not authenticate please register"
        })
    }
 
    
    const ispassword = await  bcrypt.compare(password ,user.password )
  
    if(!ispassword){
        return res.status(301).json({
            message : "something went wrong"
        })
    }

    const token = jwt.sign({_id :user._id } , "shh")
    res.cookie("token" , token)
    return res.status(201).json({
        message : "login successfull"
    })
}

const userLogout = function (req , res) {
    res.cookie.token = ""
    return res.status(203).json({message : "logout success"})
}

//  food-partner 

const foodpartnerRegister  = async function(req , res){
    const {email , password , username , mobile_number , address   } = req.body
    const isAccountAlreadyExists = await foodpartner.findOne({email})

    if (isAccountAlreadyExists) {
        return res.status(400).json({
            message: "Food partner account already exists"
        })
    }

    const hashpassword = await bcrypt.hash(password , 10)
    const newfoodpartner = await foodpartner.create({
        email , 
        password : hashpassword ,
        username ,
        mobile_number , 
        address  
    })
    const token = jwt.sign({_id : newfoodpartner._id} , 'shh')
    res.cookie('token' , token)

    res.status(201).json({mesaage : "new food partner created"})
}

    const foodpartnerLogin = async function (req, res){
        const {email , password } = req.body
        const isfoodpartner = await foodpartner.findOne({email})
        console.log(isfoodpartner);
        
        if (!isfoodpartner) {
            return res.status(301).json({
                message : "foodpartner not exsist"
            })
        }
        const ispassword = await bcrypt.compare(password , isfoodpartner.password )
        console.log(ispassword)
        if(!ispassword){
            return res.status(301).json({
                message : "password is not correct"
            })
        }
        const token = jwt.sign({_id: isfoodpartner._id}, 'shh')
        res.cookie("token" , token )
        return res.status(201).json({
            message : "food partner login successfull" 
        })
    }
    
    const foodpartnerLogout = function (req , res){
        res.clearCookie('token');
        return res.status(301).json({message : "logout successfull"})
    }

module.exports = {
    userRegister, 
    userLogin, 
    userLogout, 
    foodpartnerRegister , 
    foodpartnerLogin,
    foodpartnerLogout
}