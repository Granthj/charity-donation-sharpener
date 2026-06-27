import { API_URL } from '../Src/Config.js';
export function Charity(navigate){

    const container = document.createElement('div');
    container.innerHTML = `
        <div class="charity-reg-container">

    <form id="charity-reg-form">

        <h2 class="charity-reg-title">
            Charity Registration
        </h2>

        <div class="charity-reg-field">

            <label for="charity-reg-name">
                Organization Name
            </label>

            <input 
                type="text"
                id="charity-reg-name"
                name="organizationName"
                placeholder="Enter organization name"
                required
            >
        </div>

        <div class="charity-reg-field">

            <label for="charity-reg-description">
                Description
            </label>

            <textarea
                id="charity-reg-description"
                name="description"
                placeholder="Describe your organization"
                required>
            </textarea>

        </div>

        <div class="charity-reg-field">

            <label for="charity-reg-location">
                Location
            </label>

            <textarea
                id="charity-reg-location"
                name="location"
                placeholder="Enter organization location"
                required>
            </textarea>

        </div>

        <div class="charity-reg-field">

            <label for="charity-reg-goal">
                Goal
            </label>

            <textarea
                id="charity-reg-goal"
                name="goal"
                placeholder="What is your organization's goal?"
                required>
            </textarea>

        </div>

        <div class="charity-reg-field">

            <label for="charity-reg-category">
                Category
            </label>


            <select 
                id="charity-reg-category"
                name="category"
                required>


                <option value="">
                    Select Category
                </option>

                <option value="education">
                    Education
                </option>

                <option value="healthcare">
                    Healthcare
                </option>

                <option value="child_welfare">
                    Child Welfare
                </option>

                <option value="women_empowerment">
                    Women Empowerment
                </option>

                <option value="animal_welfare">
                    Animal Welfare
                </option>

                <option value="environment">
                    Environment
                </option>

                <option value="poverty_alleviation">
                    Poverty Alleviation
                </option>

                <option value="food_relief">
                    Food Relief
                </option>

                <option value="disaster_relief">
                    Disaster Relief
                </option>

                <option value="elderly_care">
                    Elderly Care
                </option>

                <option value="disability_support">
                    Disability Support
                </option>

                <option value="human_rights">
                    Human Rights
                </option>

                <option value="community_development">
                    Community Development
                </option>

                <option value="rural_development">
                    Rural Development
                </option>

                <option value="religious">
                    Religious
                </option>

                <option value="other">
                    Other
                </option>


            </select>

        </div>

        <div class="charity-reg-field">

            <label for="charity-reg-mission">
                Mission
            </label>

            <textarea
                id="charity-reg-mission"
                name="mission"
                placeholder="Enter organization mission">
            </textarea>

        </div>
          <div class="charity-reg-field">

            <label for="charity-reg-image">
                Add Image
            </label>

            <input 
                type="img"
                id="charity-reg-image"
                name="image"
                placeholder="image url"
            >
        </div>
        <button 
            type="submit"
            class="charity-reg-btn">

            Register Charity

        </button>
    </form>
</div>
    `;

    const form = container.querySelector("#charity-reg-form");


    form.addEventListener("submit", async(e)=>{
        e.preventDefault();

        const charityData = {

            // email:container.querySelector("#charity-reg-email").value,

            organizationName:container.querySelector("#charity-reg-name").value,

            description:container.querySelector("#charity-reg-description").value,

            location:container.querySelector("#charity-reg-location").value,

            goal:container.querySelector("#charity-reg-goal").value,

            category:container.querySelector("#charity-reg-category").value,

            mission:container.querySelector("#charity-reg-mission").value,

            image:container.querySelector("#charity-reg-image").value
        };

        try{
            const response = await axios.post(

                `${API_URL}/charity-registration`,

                charityData,

                {
                    headers:{

                        "Content-Type":"application/json",

                        "Authorization":
                        `Bearer ${localStorage.getItem("token")}`

                    }
                }

            );
            console.log(response.data,"charity registered");
            alert("Charity Registered Successfully");
            form.reset();
            navigate('/');
        }
        catch(error){
            console.log(error.response?.data || error.message);

            alert("Registration failed");
        }
    });

    return container;
}