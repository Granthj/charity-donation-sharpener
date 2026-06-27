import { API_URL } from "../Src/Config.js";

export function DonationHistory(navigate) {

    const container = document.createElement("div");

    container.innerHTML = `

    <div class="donation-history-page-container">

        <div class="donation-history-page-card">

            <h2 class="donation-history-page-title">
                My Donation History
            </h2>


            <div class="donation-history-page-summary">

                <h3>
                    Total Donated
                </h3>

                <p id="donation-history-total">
                    
                </p>

            </div>



            <div class="donation-history-page-table-wrapper">


                <table class="donation-history-page-table">


                    <thead>

                        <tr>

                            <th>
                                Charity Name
                            </th>


                            <th>
                                Donor Name
                            </th>


                            <th>
                                Amount
                            </th>


                            <th>
                                Date
                            </th>


                            <th>
                                Status
                            </th>

                            <th>
                                Download Receipt
                            </th>


                        </tr>


                    </thead>



                    <tbody id="donation-history-body">


                    </tbody>


                </table>


            </div>


        </div>


    </div>

    `;

    const tableBody = container.querySelector("#donation-history-body");

    const total = container.querySelector("#donation-history-total");

    async function loadDonationHistory() {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(`${API_URL}/donation-history`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const donations = response.data.donation;
            const username = response.data.username;

            let totalAmount = 0;

            tableBody.innerHTML = "";

            donations.forEach((donation) => {

                totalAmount += Number(donation.amount);

                const row = document.createElement("tr");

                row.innerHTML = `

                    <td>
                        ${donation.Charity.organizationName}
                    </td>

                    <td>
                        ${username}
                    </td>

                    <td>
                        ₹${donation.amount}
                    </td>

                    <td>
                        ${new Date(donation.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                        ${donation.paymentStatus}
                    </td>

                    <td>
                        <button class="download-receipt-btn" aria-label="Download receipt" title="Download receipt">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                        </button>
                    </td>


                `;

                const downloadBtn = row.querySelector(".download-receipt-btn");

                downloadBtn.addEventListener("click", () => {

                    downloadReceipt(donation, username);
                });

                tableBody.appendChild(row);
            });

            total.innerHTML = `₹${totalAmount}`;

        }
        catch (err) {
            console.log(err);
        }
    }
    function downloadReceipt(donation, username) {

        const receipt = document.createElement("div");
        receipt.style.position = "absolute";
        receipt.style.left = "-9999px";
        receipt.style.top = "0";
        receipt.style.width = "420px";
        receipt.style.padding = "32px";
        receipt.style.background = "#ffffff";
        receipt.style.color = "#1a1a1a";
        receipt.style.fontFamily = "'Segoe UI', Arial, sans-serif";
        receipt.style.border = "1px solid #e0e0e0";
        receipt.style.boxSizing = "border-box";

        receipt.innerHTML = `
            <div style="text-align:center; border-bottom:2px solid #2e7d32; padding-bottom:16px; margin-bottom:20px;">
                <h2 style="margin:0; font-size:22px; color:#2e7d32; letter-spacing:0.5px;">
                    DONATION RECEIPT
                </h2>
                <p style="margin:6px 0 0; font-size:12px; color:#888;">
                    Donation ID: ${donation.id}
                </p>
            </div>

            <table style="width:100%; border-collapse:collapse; font-size:14px;">
                <tr>
                    <td style="padding:8px 0; color:#666;">Donor Name</td>
                    <td style="padding:8px 0; text-align:right; font-weight:600;">${username}</td>
                </tr>
                <tr style="border-top:1px solid #f0f0f0;">
                    <td style="padding:8px 0; color:#666;">Charity</td>
                    <td style="padding:8px 0; text-align:right; font-weight:600;">${donation.Charity.organizationName}</td>
                </tr>
                <tr style="border-top:1px solid #f0f0f0;">
                    <td style="padding:8px 0; color:#666;">Date</td>
                    <td style="padding:8px 0; text-align:right; font-weight:600;">${new Date(donation.createdAt).toLocaleDateString()}</td>
                </tr>
                <tr style="border-top:1px solid #f0f0f0;">
                    <td style="padding:8px 0; color:#666;">Status</td>
                    <td style="padding:8px 0; text-align:right; font-weight:600; color:${donation.paymentStatus === 'success' ? '#2e7d32' : '#c62828'};">
                        ${donation.paymentStatus}
                    </td>
                </tr>
            </table>

            <div style="border-top:2px solid #2e7d32; margin-top:16px; padding-top:16px; display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:14px; color:#666;">Amount Donated</span>
                <span style="font-size:24px; font-weight:700; color:#2e7d32;">₹${donation.amount}</span>
            </div>

            <p style="text-align:center; font-size:11px; color:#aaa; margin-top:24px;">
                Thank you for your generosity.
            </p>
        `;

        document.body.appendChild(receipt);


        html2canvas(receipt).then(canvas => {

            const link = document.createElement("a");

            link.download = `donation-receipt-${donation.id}.png`;

            link.href = canvas.toDataURL();

            link.click();

            if (document.body.contains(receipt)) {
                document.body.removeChild(receipt);
            }

        });
    }
    loadDonationHistory();

    return container;

}