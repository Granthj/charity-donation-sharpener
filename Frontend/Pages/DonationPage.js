import { API_URL } from "../Src/Config.js";

export function Donation(navigate,id){

    const container = document.createElement('div');

    container.innerHTML = `
    
        <div class="donation-page-container">

            <div class="donation-page-card">

                <div class="donation-page-image-wrapper">

                    <img 
                        id="donation-page-image"
                        class="donation-page-image"
                        alt="Charity Image"
                    >

                </div>

                <div class="donation-page-content">


                    <h1 
                    class="donation-page-title">
                    
                    </h1>

                    <span 
                    class="donation-page-category">
                    
                    </span>

                    <p 
                    class="donation-page-location">
                    
                    </p>

                    <div class="donation-page-section">


                        <h3>
                            Mission
                        </h3>


                        <p id="donation-page-mission"></p>


                    </div>





                    <div class="donation-page-section">


                        <h3>
                            About This Charity
                        </h3>


                        <p id="donation-page-description"></p>


                    </div>

                    <div class="donation-page-section">


                        <h3>
                            Goal
                        </h3>


                        <p id="donation-page-goal"></p>


                    </div>

                    <div class="donation-page-progress-box">


                        <h3>
                            Donation Progress
                        </h3>

                        <div class="donation-page-progress-bar">

                            <div class="donation-page-progress-fill"></div>

                        </div>

                        <p>

                            ₹20,000 raised of ₹1,00,000

                        </p>

                    </div>

                    <div class="donation-page-payment">


                        <h3>
                            Make a Donation
                        </h3>

                        <input

                        type="number"

                        class="donation-page-amount"

                        id="donation-page-amount"

                        placeholder="Enter amount"

                        >
                        <h4>
                            Payment Method
                        </h4>

                        <div class="donation-page-methods">
                            <button>UPI</button>
                            <button>Card</button>
                            <button>Net Banking</button>
                        </div>

                        <button class="donation-page-donate-btn">Donate Now</button>
                            
                    </div>
                </div>
            </div>
        </div>

    `;

     const image = container.querySelector("#donation-page-image");


    const title = container.querySelector(".donation-page-title");


    const category = container.querySelector(".donation-page-category");


    const location = container.querySelector(".donation-page-location");


    const mission = container.querySelector("#donation-page-mission");


    const description = container.querySelector("#donation-page-description");


    const goal = container.querySelector("#donation-page-goal");



    async function loadDonation(){


        try{

            const response = await axios.get(`${API_URL}/charity/${id}`);

            const data = response.data;

            console.log(data);

            image.src = data.image || "";

            title.innerHTML = data.organizationName;


            category.innerHTML = data.category;


            location.innerHTML = `📍 ${data.location}`;


            mission.innerHTML = data.mission;


            description.innerHTML = data.description;


            goal.innerHTML = data.goal;

        }
        catch(err){
            console.log(err);
        }
    }
    const donateBtn = container.querySelector(".donation-page-donate-btn");
    donateBtn.addEventListener("click",()=>{

        // const amount = container.querySelector("#donation-page-amount").value;
        console.log("Donation ID:", id);
        navigate(`/payment?organisationId=${id}`);
    });
    loadDonation();
    return container;
    
}