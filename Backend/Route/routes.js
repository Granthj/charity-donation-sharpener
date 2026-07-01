const express = require('express');
const route = express.Router();
const auth = require('../Utils/authorization.js');
const signupController = require('../Controller/SingupController.js');
const loginController = require('../Controller/LoginController.js');
const ProfileController = require('../Controller/ProfileController.js');
const CharityController = require('../Controller/CharityController.js');
const paymentController = require('../Controller/PaymentController.js');
const adminGetAllController = require('../Controller/AdminGetAllUsersController.js');
const donationHistoryController = require('../Controller/DonationHistoryController.js');
const adminCharityController = require('../Controller/AdminCharitiesController.js');
const adminDonationController = require('../Controller/AdminDonationController.js');
const checkUserAccountTypeController = require('../Controller/CheckUserAccountTypeController.js');


route.post('/login',loginController);
route.post('/signup',signupController);

route.get('/check-account-type',auth,checkUserAccountTypeController.checkUserAccountType);

route.put('/profile-update',ProfileController.UpdateProfile);
route.get('/profile',auth,ProfileController.GetProfile);

route.post('/charity-registration',auth,CharityController.postCharity);
route.get('/charity-getData',CharityController.getCharity);
route.get('/charity/:id',CharityController.getUniqueCharity);

route.get('/donation-history',auth,donationHistoryController.donationhistory);
route.get('/charity-donationUsers',auth,donationHistoryController.getDonationsByOwner);
route.post('/create-impact-report/:donationId/:charityId',auth,donationHistoryController.postImpactReport);
route.get('/check-impact-report/:donationId',auth,donationHistoryController.getCheckImpactReport);

route.post('/pay',auth,paymentController.processDonation);
route.get('/payment-status/:cashFreeRefId',auth,paymentController.donationStatus);

route.get('/impact-report',auth,CharityController.getImpactCharity);

route.get('/admin/users',adminGetAllController);
route.get('/admin/charities',adminCharityController.adminGetAllCharities);
route.patch('/admin/charity-status/:id',adminCharityController.updateCharityStatus);

route.get('/admin/getAllDonation',adminDonationController.adminGetAllDonations);
route.get('/admin/view-donarList/:charityId',adminDonationController.adminGetCharityId);



module.exports = route;
