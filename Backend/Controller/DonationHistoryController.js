const User = require('../Model/UserSchema');
const Donation = require('../Model/DonationSchema');
const Charity = require('../Model/CharitySchema');

const donationhistory = async(req,res)=>{

    try{

        const userId = req.userId;

        const user = await User.findByPk(userId);

        if(!user){
            return res.status(404).json({message:'user not found'});
        }

        const username = user.name;

        const donation = await Donation.findAll({
            where:{
                userId:userId
            },
            include:[
                {
                    model:Charity,
                    attributes:[
                        'organizationName'
                    ]
                }
            ],
            order:[
                ['createdAt','DESC']
            ]
        });

        res.status(200).json({username:username,donation:donation});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error in controller"});
    }
}

module.exports = {
    donationhistory
}