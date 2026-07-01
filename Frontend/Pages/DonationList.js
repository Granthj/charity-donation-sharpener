import { API_URL } from "../Src/Config.js";

export function CharityOwnerDonations(navigate) {

    const container = document.createElement("div");

    container.innerHTML = `

    <div class="charity-owner-container">

        <div class="charity-owner-card">

            <div class="charity-owner-header">

                <h1>
                    Donation Management
                </h1>

                <p>
                    View donations received by your charity and create impact reports
                </p>

            </div>

            <div id="donation-list" class="donation-list"></div>

        </div>

    </div>
    `;

    const donationList = container.querySelector("#donation-list");

    async function loadDonations(){

        try{

            const token = localStorage.getItem("token");

            const response = await axios.get(`${API_URL}/charity-donationUsers`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            const donations = response.data;
            donationList.innerHTML="";

            if(!donations || donations.length===0){


                donationList.innerHTML=`

                    <div class="no-donation">

                        <h3>
                            No donations received yet
                        </h3>

                    </div>

                `;

                return;
            }

            donations.forEach(donation=>{
                const card = document.createElement("div");

                card.className = "donation-card";

                card.innerHTML = `
                <div class="donation-header">
                    <h2>
                        ${donation.Charity.organizationName}
                    </h2>

                    <span>

                    Donation ID:${donation.id}

                    </span>

                </div>

                <div class="donor-section">

                    <h3>
                        Donor Information
                    </h3>

                    <p>

                    Name:
                    ${donation.User.name}

                    </p>

                    <p>

                    Email:
                    ${donation.User.email}

                    </p>

                </div>

                <div class="donation-info">

                    <div>

                        <strong>
                            Amount
                        </strong>

                        <p>
                            ₹${donation.amount}
                        </p>

                    </div>

                    <div>

                        <strong>
                            Donation Date
                        </strong>

                        <p>

                        ${new Date(donation.createdAt).toLocaleDateString()}

                        </p>

                    </div>

                </div>

                <button class="impact-btn" data-id="${donation.id}">Create Impact Report</button>
                `;
                const impactBtn = card.querySelector(".impact-btn");

                impactBtn.addEventListener("click",()=>{
                    navigate(`/create-impact-report/${donation.id}/${donation.Charity.id}`);
                });

                donationList.appendChild(card);
            });
        }
        catch(err){
            console.log(err);
        }

    }

    loadDonations();

    return container;

}