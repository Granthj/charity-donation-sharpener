import { API_URL } from "../src/config.js";

export function Navbar(navigation) {

    const container = document.createElement('div');
    container.innerHTML = `
        <nav class="nav">
            <div class="nav-container">
                <div class="logo">ExpenseApp</div>
                
                <div class="search-box">
                    <input type="text" id="charity-search" placeholder="Search city...">
                    <button id="search-btn">Search</button>
                </div>
                <ul class="nav-links">
                    <li><a href="/donation">Profile</a></li>
                    <li><a href="/donation-history">Donation History</a></li>
                    <li><a href="/charity-registration">Add New Post</a></li>
                </ul>

                <div class="menu-toggle">☰</div>
            </div>
        </nav>
    `
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
    const searchBtn = container.querySelector("#search-btn");

    let debounceTimer;
    function doSearch() {
        clearTimeout(debounceTimer);
        const city = searchInput.value.trim();
        const newUrl = city ? `/?city=${encodeURIComponent(city)}` : `/`;
        navigation(newUrl);
    }

    searchInput.addEventListener("input", () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(doSearch, 1000);
    });

    searchBtn.addEventListener("click", doSearch);

    // mobile toggle
    const toggle = container.querySelector('.menu-toggle');
    const links = container.querySelector('.nav-links');

    toggle.addEventListener('click', () => {
        links.classList.toggle('active');
    });

    return container;
}