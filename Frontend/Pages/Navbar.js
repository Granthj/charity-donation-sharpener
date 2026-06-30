import { API_URL } from "../src/config.js";

export function Navbar(navigation) {

    const container = document.createElement('div');
    const isAdminPage = window.location.pathname.startsWith("/admin");
    container.innerHTML = `
        <nav class="nav">
            <div class="nav-container">
                <div class="logo"><a href="/" id="logo-link">Donation Company</a></div>
                ${!isAdminPage ? `
                <div class="search-box">
                    <input type="text" id="charity-search" placeholder="Search by city or category">
                </div>
                ` : ''}
                ${!isAdminPage ? `
                <ul class="nav-links">
                    <li><a href="/donation">Profile</a></li>
                    <li><a href="/donation-history">Donation History</a></li>
                    <li><a href="/charity-registration">Add New Post</a></li>
                    <li><a href="/impact-report">Impact Report</a></li>
                </ul>` : ''}

                ${!isAdminPage ? `<div class="menu-toggle">☰</div>` : ''}
            </div>
        </nav>
    `;
    const navLinks = container.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const route = link.getAttribute('href');
            if (route === '/logout') {
                localStorage.removeItem("token");
                navigation("/login");
            }
            else {
                navigation(route);
            }
        })
    });

    const searchInput = container.querySelector("#charity-search");

    if (searchInput) {
        let debounceTimer;
        function doSearch() {
            clearTimeout(debounceTimer);
            const search = searchInput.value.trim();
            const newUrl = search ? `/?search=${encodeURIComponent(search)}` : `/`;
            navigation(newUrl);
        }

        searchInput.addEventListener("input", () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(doSearch, 1000);
        });
    }

    const toggle = container.querySelector('.menu-toggle');
    const links = container.querySelector('.nav-links');

    if (toggle) {
        toggle.addEventListener('click', () => {
            if (links) {
                links.classList.toggle('active');
            }
        });
    } else {
        console.warn('Navbar: .menu-toggle element not found in rendered HTML');
    }

    return container;
}