const express = require('express');
const route = express.Router();
const auth = require('../Utils/authorization.js');
const signupController = require('../Controller/SingupController.js');
const loginController = require('../Controller/LoginController.js');
const ProfileController = require('../Controller/ProfileController.js');
const CharityController = require('../Controller/CharityController.js');
const paymentController = require('../Controller/PaymentController.js');

route.post('/login',loginController);
route.post('/signup',signupController);

route.put('/profile-update',ProfileController.UpdateProfile);
route.get('/profile',auth,ProfileController.GetProfile);

route.post('/charity-registration',auth,CharityController.postCharity);
route.get('/charity-getData',CharityController.getCharity);
route.get('/charity/:id',CharityController.getUniqueCharity);

route.post('/pay',auth,paymentController.processDonation);
route.get('/payment-status/:cashFreeRefId',paymentController.donationStatus);

module.exports = route;
