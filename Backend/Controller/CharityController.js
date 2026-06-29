const Charity = require('../Model/CharitySchema');
const User = require('../Model/UserSchema');
const ImpactReport = require('../Model/ImpactReportSchema');
const Donation = require('../Model/DonationSchema');
const { Op } = require("sequelize");
const postCharity = async(req,res)=>{

    try{
        const {organizationName,description,location,goal,category,mission,image} = req.body;

        const userExists = await User.findByPk(req.userId);
        if(userExists.role !== 'charity'){
            return res.status(400).json({
                success:false,
                msg:"Profile role must be charity"
            });
        }
        const userId = req.userId;
        const charity = await Charity.create({
        userId:userId,
        organizationName:organizationName,
        description:description,
        location:location,
        goal:goal,
        category:category,
        mission:mission,
        image:image
    });
        res.status(201).json({success:true,charity});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false});
    }
}

const getCharity = async(req,res)=>{

    try{
        CharityData = await Charity.findAll();

        res.status(200).json(CharityData);
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false});
    }
}
const getUniqueCharity = async(req,res)=>{

    try{
        const id = req.params.id;
        const charity = await Charity.findOne({
            where:{
                id:id
            }
        });
        if(!charity){
            return res.status(400).json({success:false,msg:'no data found'});
        }
        res.status(200).json(charity);
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false});
    }
}
const getImpactCharity = async(req,res)=>{

    try{
        const donations = await Donation.findAll({
            where:{
                userId:req.userId
            },
            include:[
                {
                    model:Charity,
                    attributes:['id','organizationName'],
                    include:[
                        {
                            model:ImpactReport
                        }
                    ]
                }
            ],
            order:[
                ['createdAt',"DESC"]
            ]
        });
        // console.log(JSON.stringify(donations,null,2),"bhbhbhbhb");
    
        res.json(donations);
    }
    catch(err){
        console.log(err)
    }

}
module.exports = {
    postCharity,
    getCharity,
    getUniqueCharity,
    getImpactCharity
}