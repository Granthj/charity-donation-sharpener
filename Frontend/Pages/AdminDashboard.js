export function AdminDashboard(navigate){

    const container = document.createElement("div");

    container.innerHTML = `

    <div class="admin-dashboard-container">

        <div class="admin-dashboard-card">

            <h1 class="admin-dashboard-title">
                Admin Dashboard
            </h1>

            <div class="admin-dashboard-buttons">


                <button class="admin-dashboard-btn" id="users-btn">

                    Users

                </button>

                <button class="admin-dashboard-btn" id="donations-btn">

                    Donations

                </button>

                <button class="admin-dashboard-btn" id="charity-btn">

                    Charity

                </button>

                <button class="admin-dashboard-btn approved" id="approved-charity-btn">

                    Approved Charity

                </button>

            </div>

        </div>

    </div>

    `;

    const usersBtn = container.querySelector("#users-btn");

    const donationsBtn = container.querySelector("#donations-btn");

    const charityBtn = container.querySelector("#charity-btn");

    const approvedBtn = container.querySelector("#approved-charity-btn");

    usersBtn.addEventListener("click",()=>{
        navigate("/admin-allUsers");
    });

    donationsBtn.addEventListener("click",()=>{
        navigate("/admin-getAllDonations");
    });

    charityBtn.addEventListener("click",()=>{
        navigate("/admin-charities");
    });

    approvedBtn.addEventListener("click",()=>{
        navigate("/admin/approved-charity");
    });

    return container;

}