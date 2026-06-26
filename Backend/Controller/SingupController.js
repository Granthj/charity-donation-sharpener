const User = require('../Model/UserSchema.js');
const bcrypt = require('bcrypt');

const signUp = async(req,res)=>{

    try{

       const {name,email,password,address,age,role} = req.body;

       const signupExists = await User.findOne({
        where:{
            email:email
        }
       });
       if(signupExists){
        return res.status(403).json({message:"email already exists",bool:true});
       }
       const hashedPassword = await bcrypt.hash(password,10);
       
       const signup = await User.create({
        name:name,
        email:email,
        password:hashedPassword,
        address:address,
        age:age,
        role:role
       });
       res.status(201).json({message:"User created with email",bool:false}); 
    }
    catch(err){
        console.log(err);
        return res.status(500).send('something wrong while creating signup');
    }
}

module.exports = signUp;