import { API_URL } from "../Src/Config.js";
export function DonationHistory(){

    const container = document.createElement('div');


    container.innerHTML = `

    <div class="donation-history-page">
        <div class="donation-page">
            <div class="donation-container">
                <h2>
                    Donation History
                </h2>

                <div id="donationList">

                    Loading donations...

                </div>
            </div>
        </div>
    </div>
    `;



    const donationList =
    container.querySelector("#donationList");
    async function loadDonationHistory(){


        try{
            const response = await axios.get(

                `${API_URL}/api/donations/history`,

                {

                method:"GET",

                headers:{


                    "Authorization":
                    `Bearer ${localStorage.getItem("token")}`

                }

                }

            );
            const donations = await response.json();
            donationList.innerHTML="";

            if(donations.length===0){
                donationList.innerHTML = `

                    <p>
                    No donation history found
                    </p>

                `;
                return;

            }
            donations.forEach((donation)=>{


                const card =
                document.createElement("div");
                card.className="donation-card";
                card.innerHTML = `


                    <h3>
                    ${donation.charityName}
                    </h3>


                    <p>
                    Amount:
                    ₹${donation.amount}
                    </p>


                    <p>
                    Status:
                    ${donation.paymentStatus}
                    </p>


                    <p>
                    Date:
                    ${new Date(
                    donation.donatedAt
                    ).toLocaleDateString()}
                    </p>



                    <button class="receipt-btn">

                    Download Receipt

                    </button>


                `;

                donationList.appendChild(card);
            });
        }
        catch(error){

            console.log(error);

            donationList.innerHTML=
            "Failed to load donations";

        }
    }
    loadDonationHistory();
    return container;

}