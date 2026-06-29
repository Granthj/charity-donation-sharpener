import { API_URL } from "../Src/Config.js";

export function ImpactReports(navigate) {

    const container = document.createElement("div");

    container.innerHTML = `

    <div class="impact-page-container">

        <div class="impact-page-card">

            <div class="impact-page-header">

                <h1>
                    Impact Reports
                </h1>

                <p>
                    See how your donations are creating real impact.
                </p>

            </div>


            <div id="impact-report-list"></div>

        </div>

    </div>

    `;

    const reportList = container.querySelector("#impact-report-list");


    async function loadReports() {

        try {

            const token = localStorage.getItem("token");


            const response = await axios.get(`${API_URL}/impact-report`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            const donations = response.data;


            console.log(donations);


            reportList.innerHTML = "";


            donations.forEach((donation) => {

                const charity = donation.Charity;

                if (charity.ImpactReports.length === 0) {


                    const card = document.createElement("div");

                    card.className = "impact-report-item";


                    card.innerHTML = `

                        <h2>
                            ${charity.organizationName}
                        </h2>

                        <p>
                            Donation Amount:
                            ₹${donation.amount}
                        </p>

                        <p>
                            Donation Date:
                            ${new Date(donation.createdAt).toLocaleDateString()}
                        </p>

                        <h3>
                            No impact update available yet
                        </h3>

                    `;
                    reportList.appendChild(card);
                    return;
                }

                charity.ImpactReports.forEach((impact) => {


                    const card = document.createElement("div");

                    card.className = "impact-report-item";


                    card.innerHTML = `
                            <h2>
                                ${charity.organizationName}
                            </h2>

                            <p>
                                Donation Amount:
                                ₹${donation.amount}
                            </p>

                            <p>
                                Donation Date:
                                ${new Date(donation.createdAt).toLocaleDateString()}
                            </p>

                            <hr>
                            <h3>
                                Impact Update
                            </h3>

                            <p>
                                ${impact.description}
                            </p>


                            <p>
                                Impact Date:
                                ${new Date(impact.createdAt).toLocaleDateString()}
                            </p>
                    `;

                    reportList.appendChild(card);
                });
            });
        }
        catch (err) {

            console.log(err);

        }
    }
    loadReports();

    return container;

}