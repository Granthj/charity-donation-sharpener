import { API_URL } from "../Src/Config.js";

export function AdminCharityList(navigate){

    const container = document.createElement("div");

    container.innerHTML = `

    <div class="admin-charity-container">

        <div class="admin-charity-card">

            <h1 class="admin-charity-title">
                Charity Approval Dashboard
            </h1>

            <div class="admin-charity-table-wrapper">

                <table class="admin-charity-table">


                    <thead>

                        <tr>

                            <th>
                                ID
                            </th>


                            <th>
                                Organization
                            </th>


                            <th>
                                Owner ID
                            </th>


                            <th>
                                Category
                            </th>


                            <th>
                                Location
                            </th>


                            <th>
                                Applied Date
                            </th>


                            <th>
                                Status
                            </th>


                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody id="admin-charity-body">

                    </tbody>

                </table>

            </div>

        </div>

    </div>


    `;

    const tableBody = container.querySelector("#admin-charity-body");

    async function loadCharities(){

        try{

            const token = localStorage.getItem("token");

            const response = await axios.get(`${API_URL}/admin/charities`);

            const charities = response.data;

            tableBody.innerHTML="";

            charities.forEach(charity=>{

                const row=document.createElement("tr");

                row.innerHTML=`

                <td>
                    ${charity.id}
                </td>

                <td>
                    ${charity.organizationName}
                </td>

                <td>
                    ${charity.userId}
                </td>

                <td>
                    ${charity.category}
                </td>

                <td>
                    ${charity.location}
                </td>

                <td>
                    ${new Date(charity.createdAt).toLocaleDateString()}
                </td>

                <td>
                    <span class=" charity-status  ${charity.status}">
                        ${charity.status}
                    </span>
                </td>

                <td>
                    <button  class="approve-btn" data-id="${charity.id}">Approve</button>

                    <button  class="reject-btn" data-id="${charity.id}">Reject</button>
                </td>

                `;

                const approveBtn = row.querySelector(".approve-btn");

                const rejectBtn = row.querySelector(".reject-btn");

                approveBtn.onclick=()=>{
                    updateCharity(charity.id,"approved");
                };

                rejectBtn.onclick=()=>{
                    updateCharity(charity.id,"rejected");
                };

                tableBody.appendChild(row);

            });

        }
        catch(err){

            console.log(err);

        }

    }

    async function updateCharity(id,status){

        try{

            const token = localStorage.getItem("token");

            await axios.patch(`${API_URL}/admin/charity-status/${id}`,

                {
                    status:status
                },

            );

            loadCharities();
        }
        catch(err){
            console.log(err);
        }
    }

    loadCharities();

    return container;


}