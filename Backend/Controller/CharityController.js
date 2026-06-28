const Charity = require('../Model/CharitySchema');
const User = require('../Model/UserSchema');
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
module.exports = {
    postCharity,
    getCharity,
    getUniqueCharity
}