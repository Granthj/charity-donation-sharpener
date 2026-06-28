import { API_URL } from "../Src/Config.js";

export function Payment(navigate, donationOrganisationId) {

    const container = document.createElement("div");
    container.innerHTML = `
    <div class="payment-page">
        <h2>Payment Page</h2>
        <div class="row">
            <input id="phone" placeholder="Enter phone number" type="text"/>
            <input id="amount" placeholder="Enter amount" type="text"/>
            <p>Click below to open the checkout page in popup</p>
            <button id="renderBtn">Proceed to Pay</button>
        </div>
    </div>    
    `
    const cashfree = Cashfree({
        mode: "sandbox",
    });
    container.querySelector("#renderBtn").addEventListener("click", async () => {
        const phone = container.querySelector("#phone").value;
        const amount = container.querySelector("#amount").value;
        const token = localStorage.getItem('token');
        // console.log(donationOrganisationId,'company id')
        const res = await axios.post(`${API_URL}/pay`, {
            phone: phone,
            amount: amount,
            donationOrganisationId: donationOrganisationId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }

        });
        const paymentSessionId = res.data.paymentSessionId;
        const orderId = res.data.orderId;

        let checkoutOptions = {
            paymentSessionId: paymentSessionId,
            redirectTarget: "_modal",
        };
        const result = await cashfree.checkout(checkoutOptions);
        if (result.error) {
            console.log("User has closed the popup or there is some payment error, Check for Payment Status");
            console.log(result.error);
        }
        if (result.redirect) {
            console.log("Payment will be redirected");
        }
        if (result.paymentDetails) {

            let cashFreeRefId = orderId;

            const token = localStorage.getItem("token");
            const res = await axios.get(`${API_URL}/payment-status/${cashFreeRefId}`,
                {
                    params: {
                        donationOrganisationId,
                        amount
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (res.data.donationStatus === "Success") {
                alert("Your payment is" + res.data.orderStatus);
                // navigate(`/donation-page/${donationOrganisationId}`);
                window.history.replaceState({}, "", `/donation-page/${donationOrganisationId}`);

                window.dispatchEvent(new PopStateEvent("popstate"));

            }
            // console.log(res.data.orderStatus, 'like here')
            // console.log("Payment has been completed, Check for Payment Status");
            // console.log(result.paymentDetails.paymentMessage);
        }

    });
    return container;
}