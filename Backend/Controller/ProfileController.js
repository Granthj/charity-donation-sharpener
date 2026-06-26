const User = require('../Model/UserSchema');
const Donation = require('../Model/DonationSchema');

const UpdateProfile = async (req, res) => {

    try {
        // const { userId } = req.userId;
        const email = req.body.email;
        const user = await User.findOne({where:{email:email}});
        console.log(user,'userrrr')
        if(!user){
            return res.status(404).json('The email is not found');
        }
        user.name = req.body.name;
        user.password = req.body.password;
        user.age = req.body.age;
        user.address = req.body.address;

        await user.save();

        res.status(200).json({success:true});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false});
    }

}
const GetProfile = async(req,res)=>{

    try{

        const user = await User.findAll({
            where:{
                id:req.userId
            }
        });
        if(!user){
            return res.status(404).json({success:false});
        }
        res.status(200).json({success:true,data:user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false});
    }
}
module.exports = {
    UpdateProfile,
    GetProfile
}

;