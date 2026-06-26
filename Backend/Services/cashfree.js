// import { Cashfree, CFEnvironment } from "cashfree-pg"; 
require('dotenv').config();
const { Cashfree, CFEnvironment } = require("cashfree-pg");
const cashfree = new Cashfree(CFEnvironment.SANDBOX, process.env.API_ID, process.env.SECRET_KEY);

exports.createOrder = async (

    orderId,
    orderAmount,
    orderCurrency = "INR",
    customerID,
    customerPhone
)=>{
    try{
        console.log(orderId,'nanananan')
        const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hrs from now
        const formattedExpiryDate = expiryDate.toISOString();
        var request = {
            order_amount: orderAmount,
            order_currency: orderCurrency,
            order_id: orderId,
            customer_details: {
                customer_id: String(customerID),
                customer_phone: customerPhone
            },
            "order_meta": {
                "return_url": "https://www.cashfree.com/devstudio/preview/pg/web/popupCheckout?order_id={order_id}",
                // "notify_url": "https://www.cashfree.com/devstudio/preview/pg/webhooks/75093621",
                return_url: "http://localhost:3000/api/payment-status/"+orderId,
                payment_methods: "cc,dc,upi"
            },
            order_expiry_time: formattedExpiryDate
        };
        const response = await cashfree.PGCreateOrder(request);
        return response.data.payment_session_id;
    }
    catch(err){
        console.error('Error:', err.response?.data || err.message);
        throw err;
    }
}
exports.getPaymentStatus = async(orderId)=>{

    try{
        const today = new Date().toISOString().split("T")[0];
        const response = await cashfree.PGOrderFetchPayments(today,orderId);
        let getOrderResponse = response.data;
        let orderStatus;

        if(getOrderResponse.filter((transaction) => transaction.payment_status === 'SUCCESS').length > 0){
            orderStatus = 'Success';
        }
        else if(getOrderResponse.filter((transaction) => transaction.payment_status === 'PENDING').length > 0){
            orderStatus = 'Pending';
        }
        else{
            orderStatus = "Failure";
        }
        return orderStatus;
    }
    catch(err){
        console.error('Error:', err.response?.data || err.message);
        throw err;
    }
}

