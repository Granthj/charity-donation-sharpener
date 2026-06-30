const Donation = require('../Model/DonationSchema');
const ImpactReport = require('../Model/ImpactReportSchema');
const Charity = require('../Model/CharitySchema');

const adminGetAllDonations = async(req,res)=>{

    try{

        const donations = await Donation.findAll({
            include:[
                {
                    model:Charity,
                    attributes:['organizationName']
                }
            ],
            order:[
                ['createdAt',"DESC"]
            ]
        });
        if(donations.length === 0){
            return res.status(404).json({msg:"no donation found"});
        }

        res.status(200).json(donations)
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"Server error"});
    }
}

const adminGetCharityId = async(req,res)=>{

    try{
        const {id} = req.params;

        const donation = await Donation.findOne({
            where:{
                id:id
            }
        });

        if(!donation){
            return res.status(404).json({message:"Donation not found"});
        }

        const charityId = donation.charityId;

        res.status(200).json(charityId);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error while finding charity id"});
    }
}
const adminUpdateImpactReport = async(req,res)=>{

    try{

        const {charityId} = req.params;

        const {title,description} = req.body;

        const charity = await Charity.findByPk(charityId);

        if(!charity){
            return res.status(404).json({message:"Charity not found"});
        }

        const impactReport = await ImpactReport.create({
            charityId: charityId,
            title:title,
            description:description
        });

        res.status(201).json({message:"Impact report added successfully",impactReport});



    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error while updating impact report"});
    }
}
module.exports = {
    adminGetAllDonations,
    adminGetCharityId,
    adminUpdateImpactReport
}