import { API_URL } from "../Src/Config.js";
import { DonationHistory } from "./DonationHistory.js";
export function Profile(navigate){

    const container = document.createElement('div');
    container.innerHTML = `
    <div class="profile-page">
        <div class="profile-container">

            <div class="profile-header">
                <div class="profile-avatar">
                    <span>G</span>
                </div>

                <h2>User Profile</h2>
            </div>


            <div class="profile-form">


                <div class="form-group">
                    <label>Name</label>
                    <input 
                        type="text" 
                        id="name"
                        placeholder="Enter your name"
                    />
                </div>


                <div class="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        id="email"
                        placeholder="Enter your email"
                        disabled
                    />
                </div>


                <div class="form-group">
                    <label>Password</label>
                    <input 
                        type="Password"
                        id="password"
                        placeholder="Enter Password"
                    />
                </div>


                <div class="form-group">
                    <label>Age</label>
                    <input 
                        type="number"
                        id="age"
                        placeholder="Enter age"
                    />
                </div>


                <div class="form-group">
                    <label>Address</label>

                    <textarea 
                        id="address"
                        placeholder="Enter your address">
                    </textarea>

                </div>

                <button id="updateProfileBtn">
                    Update Profile
                </button>
        </div>

        <div class="profile-actions">


            <button id="donationHistoryBtn">

                View Donation History

            </button>

            <button id="logoutBtn">
                Logout
            </button>
        </div>
    </div>
        <div id="profileContent"></div>
    </div>

    `;
    const name = container.querySelector("#name");
    const email = container.querySelector("#email");
    const password = container.querySelector("#password");
    const age = container.querySelector("#age");
    const address = container.querySelector("#address");
    const donationBtn = container.querySelector("#donationHistoryBtn");
    const profileContent = container.querySelector("#profileContent");

    donationBtn.addEventListener('click',()=>{
        const donationComponent =
        DonationHistory();
        profileContent.innerHTML="";
        profileContent.appendChild(donationComponent);
    });

    async function loadProfile(){


        try{

            const response = await axios.get(
                `${API_URL}/profile`,
                {
                    headers:{
                        "Authorization":
                        `Bearer ${localStorage.getItem("token")}`
                    }

                }
            );
            const data = await response.data.data[0];

            name.value = data.name || "";

            email.value = data.email || "";

            password.value = data.password || "";

            age.value = data.age || "";

            address.value = data.address || "";


        }
        catch(error){

            console.log(error);

        }

    }
    loadProfile();

    const updateBtn =
    container.querySelector("#updateProfileBtn");
    updateBtn.addEventListener("click",async()=>{


        const updatedData = {


            name:name.value,

            password:password.value,

            age:age.value,

            address:address.value,

            email:email.value
        };
        try{
            const response = await axios.put(

                `${API_URL}/profile-update`,
                updatedData,

                {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":
                        `Bearer ${localStorage.getItem("token")}`
                    }
                }

            );
            const result = await response.data;
            alert("Profile Updated");

        }
        catch(error){

            console.log(error);

        }
    });

    return container;
    
}