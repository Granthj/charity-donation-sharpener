import { API_URL } from "../Src/Config.js";

export function CreateImpactReport(navigate, donationId,charityId){

    const container = document.createElement("div");

    container.innerHTML = `

    <div class="impact-create-container">

        <div class="impact-create-card">

            <h1>
                Impact Report
            </h1>

            <div id="impact-status"></div>

            <form id="impact-form">
                <input type="text" id="impact-title" placeholder="Impact title" required>
                <textarea id="impact-description" placeholder="Describe how donation was used" required></textarea>
                <button type="submit">Submit Impact Report</button>
            </form>

        </div>

    </div>

    `;

    const form = container.querySelector("#impact-form");

    const status = container.querySelector("#impact-status");

    async function checkReport(){
        try{
            const token = localStorage.getItem("token");
            const response = await axios.get(`${API_URL}/check-impact-report/${donationId}`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if(response.data.exists){

                form.style.display="none";

                status.innerHTML=`

                    <div class="impact-done">
                        ✅ Impact Report Completed
                        <p>
                            ${response.data.impactReport.description}
                        </p>

                    </div>

                `;
            }
        }
        catch(err){
            console.log(err);
        }
    }
    form.addEventListener("submit",async(e)=>{

        e.preventDefault();

        const description = container.querySelector("#impact-description").value;
        const title = container.querySelector("#impact-title").value;

        try{
            const response = await axios.post(`${API_URL}/create-impact-report/${donationId}/${charityId}`,
                {   
                    title,
                    description
                },
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            
            if(response.data.exists){

                form.style.display="none";

                status.innerHTML=`

                    <div class="impact-done">
                        ✅ Impact Report Already Added
                    </div>

                `;

                return;
            }

            status.innerHTML=`

                <div class="success">
                    Impact report submitted successfully
                </div>

            `;

            form.reset();
        }
        catch(err){
            console.log(err);
        }
    });

    checkReport();

    return container;

}