const User = require('../Model/UserSchema');
const Donation = require('../Model/DonationSchema');
const Charity = require('../Model/CharitySchema');
const ImpactReport = require('../Model/ImpactReportSchema');

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
const getDonationsByOwner = async(req,res)=>{

    try{
        const donations = await Donation.findAll({
            include:[
                {
                    model:Charity,
                    where:{
                        userId:req.userId
                    }
                },
                {
                    model:User,
                    attributes:["name","email"]
                }
            ]
        });
        res.status(200).json(donations);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error in controller"});
    }

}
const getCheckImpactReport = async(req,res)=>{
    try{
        const {donationId} = req.params;
        const impactReport = await ImpactReport.findOne({
            where:{
                donationId:donationId
            }
        });
        if(impactReport){
            return res.status(200).json({exists:true,impactReport});
        }
        res.status(200).json({exists:false});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error in controller getCheckImpactReport"});
    }
}
const postImpactReport = async(req,res)=>{
    try{
        const {donationId, charityId} = req.params;
        const {description,title} = req.body;

        const existingReport = await ImpactReport.findOne({
            where:{
                donationId: donationId
            }
        });
        if(existingReport){
            return res.status(400).json({exists:true,impactReport:existingReport});

        }
        const charity = await Charity.findByPk(charityId);
        if(!charity){
            return res.status(404).json({message:"Charity not found"});
        }
        const impactReport = await ImpactReport.create({

            donationId: donationId,

            description:description,

            title:title,

            charityId: charityId,

        });
        res.status(201).json({message:"Impact report created successfully",impactReport,exists:false});

    }
    catch(err){
        console.log(err,'babababa');
        res.status(500).json({message:"Error in controller postImpactReport"});
    }
}        
module.exports = {
    donationhistory,
    getDonationsByOwner,
    postImpactReport,
    getCheckImpactReport
}