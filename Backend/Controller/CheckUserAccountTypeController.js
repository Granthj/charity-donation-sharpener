const User = require('../Model/UserSchema.js');

const checkUserAccountType = async(req,res)=>{

    try{
        const user = await User.findOne({
            where:{
                id:req.userId
            }
        });

        if(!user){
            return res.status(404).send('User not found');
        }
        const accountType = user.role; 
        let booleanValue = false;
        
        if(accountType === 'charity'){
            booleanValue = true;
        }

        res.status(200).json({accountType:accountType, booleanValue: booleanValue});

    }
    catch(err){
        console.log(err);
        return res.status(500).send('something wrong while checking user account type');
    }
}

module.exports = {
    checkUserAccountType
}