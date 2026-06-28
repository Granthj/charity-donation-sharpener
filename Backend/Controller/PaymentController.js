const { createOrder, getPaymentStatus } = require('../Services/cashfree');
const sendMail = require('../Utils/nodemailer');
const Payment = require('../Model/PaymentSchema');
const User = require('../Model/UserSchema');
const Charity = require('../Model/CharitySchema');
const Donation = require('../Model/DonationSchema');

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

        await Payment.create({
            cashFreeRefId,//
            donationSessionId,//
            donateAmount,//
            donarId: userID, //
            donationOrganisationId: donationOrganisationId, //
            donateCurrency,//
            donationStatus: "Pending"//
        });

        await Donation.create({
            cashFreeRefId:cashFreeRefId,
            userId:donarId,
            charityId:donationOrganisationId,
            amount:donateAmount
        });

        // const user = await User.findByPk(req.userId);
        // user.save();

        res.json({ paymentSessionId: donationSessionId, orderId: cashFreeRefId });
    }
    catch (err) {
        console.log(err, 'errororororor')
        res.status(500).json({ message: "Something went wrong" });
    }
}
const donationStatus = async (req, res) => {

    try {
        const { donationOrganisationId, amount } = req.query;
        const { cashFreeRefId } = req.params;
        const status = await getPaymentStatus(cashFreeRefId);

        const updatePayment = await Payment.update(
            { donationStatus: status },
            {
                where: {
                    cashFreeRefId: cashFreeRefId
                }
            }
        );
        console.log(updatePayment,'bnbnbnbnb')
        const addAmount = await Charity.findByPk(donationOrganisationId);
        if (addAmount) {

            addAmount.totalDonation = Number(addAmount.totalDonation || 0) + Number(amount);

            addAmount.totalDonations = Number(addAmount.totalDonations || 0) + 1;

            await addAmount.save();

        }
        const updateDonation = await Donation.findOne({
            where:{
                cashFreeRefId:cashFreeRefId
            }
        });
        if(updateDonation){
            updateDonation.paymentStatus = "Success";

            await updateDonation.save();
        }
        const user = await User.findOne({
            where:{
                id:req.userId
            }
        })
         await sendMail(user.email,

            "Donation Successful",

            `
                <h2>Thank you for your donation ❤️</h2>

                <p>Hello ${user.name},</p>

                <p>Your donation details:</p>

                <p>
                Amount: ₹${amount}
                </p>

                <p>
                Status: Success Payment Verification
                </p>

                <br>

                <p>
                Thank you for supporting our charity. ${addAmount.organizationName}
                </p>
            `
        );

        res.json({ cashFreeRefId, donationStatus: status });
    }
    catch (err) {
        console.log(err,'rarararara');
        res.status(500).json({ message: "Something went wrong not getting payment status" });
    }
}

module.exports = {
    processDonation,
    donationStatus
};