const Charity = require('../Model/CharitySchema');

const adminGetAllCharities = async(req,res)=>{

    try{

        const charity = await Charity.findAll();

        if(!charity){
            return res.status(404).json({msg:"no charity found"});
        }

        res.status(200).json(users)
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"Server error"});
    }
}


module.exports = {
    adminGetAllCharities
}