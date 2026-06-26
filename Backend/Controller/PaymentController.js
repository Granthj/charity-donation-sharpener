const {createOrder,getPaymentStatus} = require('../Services/cashfree');
const Donation = require('../Model/PaymentSchema');
const User = require('../Model/UserSchema');

const processDonation = async (req, res) => {
    const cashFreeRefId = "Donation-" + Date.now();
    const donarId = req.userId
    const donationOrganisationId = req.body.donationOrganisationId;
    const donateAmount = req.body.amount;
    const donateCurrency = "INR";
    const userID = req.userId;
    const userPhone = req.body.phone;
    // console.log(userID,'gagagagaga')
    
    try {
        
        const donationSessionId = await createOrder(
            cashFreeRefId,
            donateAmount,
            donateCurrency,
            userID,
            userPhone
        );

        await Donation.create({
            cashFreeRefId,//
            donationSessionId,//
            donateAmount,//
            donarId:userID, //
            donationOrganisationId:donationOrganisationId, //
            donateCurrency,//
            donationStatus:"Pending"//
        });
        
        // console.log(req.userId,'hello')
        const user = await User.findByPk(req.userId);
        user.save();
        res.json({paymentSessionId:donationSessionId,orderId:cashFreeRefId});
    }
    catch(err){
        console.log(err,'errororororor')
        res.status(500).json({message:"Something went wrong"});
    }
}
const donationStatus = async(req,res)=>{

    try{
        const {cashFreeRefId} = req.params;

        const status = await getPaymentStatus(cashFreeRefId);

        const updatePayment = await Payment.update(
            {donationStatus:status},
            {
                where:{
                    donarId:cashFreeRefId
                }
            }
        );
        res.json({cashFreeRefId,donationStatus:status});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Something went wrong not getting payment status"});
    }
}

module.exports = {
    processDonation,
    donationStatus
};