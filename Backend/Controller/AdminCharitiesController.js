const Charity = require('../Model/CharitySchema');

const adminGetAllCharities = async(req,res)=>{

    try{

        const charity = await Charity.findAll();

        if(!charity){
            return res.status(404).json({msg:"no charity found"});
        }

        res.status(200).json(charity)
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"Server error"});
    }
}

const updateCharityStatus = async(req,res)=>{

    try{
        const {id} = req.params;
        console.log(id,req.body.status,'alalala')
        const updateStatus = await Charity.update(
            {
                status:req.body.status
            },
            {
                where:{
                    id:req.params.id
                }
            }
        );
        res.status(200).json({message:"Charity status updated successfully",updateStatus});
    }
    catch(err){
        console.log(err);

        res.status(500).json({message:"Error updating charity status"});
    }
}
module.exports = {
    adminGetAllCharities,
    updateCharityStatus
}