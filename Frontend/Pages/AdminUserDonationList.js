import { API_URL } from "../Src/Config.js";

export function AdminDonationList(navigate){

    const container = document.createElement("div");

    container.innerHTML = `

    <div class="admin-donation-page">

        <div class="admin-donation-card">

            <h1 class="admin-donation-title">
                All Donations
            </h1>

            <div class="admin-donation-table-wrapper">

                <table class="admin-donation-table">

                    <thead>

                        <tr>

                            <th>
                                Donation ID
                            </th>


                            <th>
                                Organization
                            </th>


                            <th>
                                Amount
                            </th>


                            <th>
                                Donation Date
                            </th>


                            <th>
                                Action
                            </th>


                        </tr>


                    </thead>

                    <tbody id="admin-donation-body">

                    </tbody>

                </table>

            </div>

        </div>

    </div>

    `;

    const tableBody = container.querySelector("#admin-donation-body");

    async function loadDonations(){

        try{

            const response = await axios.get(`${API_URL}/admin/getAllDonation`);

            const donations = response.data;

            tableBody.innerHTML="";

            if(donations.length===0){


                tableBody.innerHTML=`

                <tr>

                    <td colspan="5">
                        No donations found
                    </td>

                </tr>

                `;

                return;

            }

            donations.forEach(donation=>{

                const row = document.createElement("tr");

                row.innerHTML=`

                    <td>
                        ${donation.id}
                    </td>


                    <td>
                        ${donation.Charity.organizationName}
                    </td>


                    <td>
                        ₹${donation.amount}
                    </td>


                    <td>
                        ${new Date(donation.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                        <button  class="view-donors-btn" data-id="${donation.charityId}">View Donors</button>
                    </td>
                `;
                row.querySelector(".view-donors-btn").addEventListener("click",()=>{
                    navigate(`/admin/charity-donors/${donation.charityId}`);
                });
                tableBody.appendChild(row);
            });

        }
        catch(err){
            console.log(err);
        }
    }

    loadDonations();

    return container;

}