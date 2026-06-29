const User = require('../Model/UserSchema');
const adminGetAllUsers = async(req,res)=>{

    try{
        const users = await User.findAll();

        if(!users){
            return res.status(404).json({msg:"no user found"});
        }
        res.status(200).json(users)
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"Server error"});
    }
}
module.exports = adminGetAllUsers;