const jwt = require("jsonwebtoken")
const FoodPartnerModel = require("../model/food-partner.model")
const {usermodel} = require("../model/user.model")

const isfoodpartner = async function (req, res , next) {
    try {
        const iscookie = req.cookies.token
      
        if (!iscookie) {
            return res.status(402).json({ message: "first login " })
        }
        const decodecookie = jwt.verify(iscookie, 'shh')
        const foodpartner = await FoodPartnerModel.findById(decodecookie._id)
        if (!foodpartner) {
            return res.status(402).json({ message: "not foodpartner" })
        }
        req.foodpartner = foodpartner
        
        
      next();
    } catch (error) {
        console.log(error)
        return res.status(501).json({
            message: 'something is wrong with middleware '

        })

    }
    
}

async function isuser(req , res , next ) {
        const token = req.cookies.token;

    if(!token){
        res.status(500).json({message : "login you dont have token "})
    }

try{   const decoded  = jwt.verify(token , "shh")
   const user = await usermodel.findById(decoded._id)

   req.user = user ; 

   return next()
        }catch(error){
    console.log(error.message)
   }
   

}
module.exports = {isfoodpartner , isuser}