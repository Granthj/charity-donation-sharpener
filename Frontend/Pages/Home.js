import { API_URL } from '../Src/Config.js';
export function Home(navigate, search) {

    const container = document.createElement('div');

    container.innerHTML = `
        
        <div class="charity-card-page-container">

            <h2 class="charity-card-page-title">
                Registered Charities
            </h2>

            <div class="charity-card-page-grid" id="charity-card-grid">

            </div>
        </div>
    `;
    const cardGrid = container.querySelector("#charity-card-grid");
    async function createCart() {

        try {
            let url = `${API_URL}/charity-getData`;

            const response = await axios.get(url);

            let cartData = response.data;

            cartData = cartData.filter(data => {
                return data.status !== "pending" && data.status !== "rejected";
            });

            if (search) {
                cartData = cartData.filter(data => {
                    return (
                        data.location.toLowerCase().includes(search.toLowerCase()) ||
                        data.category.toLowerCase().includes(search.toLowerCase())
                    );
                });
            }
            // console.log(cartData);
            cardGrid.innerHTML = "";

            if (cartData.length === 0) {
                cardGrid.innerHTML = `

                    <h3 class="no-charity">
                        No charity found for this city
                    </h3>
                `;
                return;
            }
            cartData.forEach(data => {
                renderData(data);
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    function renderData(data) {
        const card = document.createElement("div");


        card.classList.add(
            "charity-card-page-item"
        );

        card.innerHTML = `
            <img src="${data.image || 'default-image.jpg'}" class="charity-card-page-image" alt="charity image">
            <h3>${data.organizationName}</h3>
            <p class="charity-card-page-category">${data.category}</p>
            <p>${data.description}</p>
            <p>📍 ${data.location}</p>

            <button class="charity-card-page-btn">Donate</button>
        `;

        const donateBtn = card.querySelector(".charity-card-page-btn");

        donateBtn.addEventListener("click", () => {
            navigate(`/donation-page/${data.id}`);
        });

        cardGrid.appendChild(card);

    }
    createCart();
    return container;
}