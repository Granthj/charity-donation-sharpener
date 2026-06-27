import { API_URL } from "../Src/Config.js";

export function DonationHistory(navigate){

    const container = document.createElement("div");

    container.innerHTML = `

    <div class="donation-history-page-container">

        <div class="donation-history-page-card">

            <h2 class="donation-history-page-title">
                My Donation History
            </h2>


            <div class="donation-history-page-summary">

                <h3>
                    Total Donated
                </h3>

                <p id="donation-history-total">
                    
                </p>

            </div>



            <div class="donation-history-page-table-wrapper">


                <table class="donation-history-page-table">


                    <thead>

                        <tr>

                            <th>
                                Charity Name
                            </th>


                            <th>
                                Donor Name
                            </th>


                            <th>
                                Amount
                            </th>


                            <th>
                                Date
                            </th>


                            <th>
                                Status
                            </th>


                        </tr>


                    </thead>



                    <tbody id="donation-history-body">


                    </tbody>


                </table>


            </div>


        </div>


    </div>

    `;

    const tableBody = container.querySelector("#donation-history-body");


    const total = container.querySelector("#donation-history-total");



    async function loadDonationHistory(){


        try{


            const token = localStorage.getItem("token");


            const response = await axios.get(`${API_URL}/donation-history`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            const donations = response.data;

            let totalAmount = 0;

            tableBody.innerHTML = "";

            donations.forEach((donation)=>{

                totalAmount += Number(donation.donateAmount);

                const row = document.createElement("tr");

                row.innerHTML = `

                    <td>
                        ${donation.charityName}
                    </td>

                    <td>
                        ${donation.userName}
                    </td>

                    <td>
                        ₹${donation.donateAmount}
                    </td>

                    <td>
                        ${new Date(donation.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                        ${donation.donationStatus}
                    </td>

                    <td>
                        ${donation.paymentId}
                    </td>


                `;


                tableBody.appendChild(row);


            });



            total.innerHTML =
            `₹${totalAmount}`;


        }
        catch(err){
            console.log(err);
        }
    }

    loadDonationHistory();

    return container;

}