import { API_URL } from "../Src/Config.js";

export function AdminViewCharityDonarList(navigate,charityId){

    const container = document.createElement('div');

    container.innerHTML = `
    
        <div class="admin-donors-container">

        <div class="admin-donors-card">

            <div class="admin-donors-header">

                <h1>
                    Charity Donors
                </h1>

                <p>
                    View users who donated to this charity
                </p>

            </div>

            <div class="admin-donors-table-wrapper">

                <table class="admin-donors-table">

                    <thead>

                        <tr>

                            <th>User ID</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Donation Amount</th>

                            <th>Donation Date</th>

                        </tr>

                    </thead>

                    <tbody id="donor-list"></tbody>

                </table>

            </div>

        </div>
</div>
    
    `;

    const donorList = container.querySelector("#donor-list");
    async function loadUsers(){

        try{

            const response = await axios.get(`${API_URL}/admin/view-donarList/${charityId}`);

            const donations = response.data;
            donorList.innerHTML = "";

            if(donations.length === 0){

                 donorList.innerHTML = `

                    <tr>
                        <td colspan="6">
                            No donors found
                        </td>
                    </tr>

                `;
                return;
            }
            donations.forEach(donation=>{

                const user = donation.User;

                const row = document.createElement("tr");

                row.innerHTML = `

                    <td data-label="User ID">
                        ${user.id}
                    </td>


                    <td data-label="Name">
                        ${user.name}
                    </td>


                    <td data-label="Email">
                        ${user.email}
                    </td>


                    <td data-label="Amount">
                        ₹${donation.amount}
                    </td>


                    <td data-label="Date">${new Date(donation.createdAt).toLocaleDateString()}
                    </td>

                `;
            
                // const impactBtn = row.querySelector(".impact-report-btn");
                // impactBtn.addEventListener("click",()=>{
                //     navigate(`/admin-impact-report/${donation.charityId}`);
                // });

                donorList.appendChild(row);
            });
            
    }
    catch(err){
        console.log(err);
    }
}
loadUsers();

return container;
}