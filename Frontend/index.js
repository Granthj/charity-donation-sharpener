import { Login } from "./Pages/Login.js"
import { SignUp } from "./Pages/Signup.js";
import { Profile } from "./Pages/Profile.js"
import { Navbar } from "./Pages/Navbar.js";
import { Payment } from "./Pages/Payment.js";
import { DonationHistory } from "./Pages/DonationHistory.js";
import { Charity } from "./Pages/CharityResgistration.js";
import { Donation } from "./Pages/DonationPage.js";
import { Home } from "./Pages/Home.js";
import { AdminDashboard } from "./Pages/AdminDashboard.js";
import { ImpactReports } from "./Pages/ImpactPage.js";
import { AdminListUsers } from "./Pages/AdminListUsers.js";
import { AdminCharityList } from "./Pages/AdminCharityList.js";
import { AdminDonationList } from "./Pages/AdminUserDonationList.js";
import { AdminViewCharityDonarList } from "./Pages/AdminViewCharityDonarList.js";

const app = document.getElementById("app");
const publicRoutes = ["/login", "/sign-up"];
function render(route) {
  app.innerHTML = "";
  const token = localStorage.getItem("token");

  // Separate the path from any query string
  const path = route.split("?")[0] || "/";

  if (!token && path !== "/login" && path !== "/sign-up") {
    navigate("/login");
    return;
  }
  if (token && !publicRoutes.includes(path)) {
    app.appendChild(Navbar(navigate));
  }

  if (path.startsWith("/donation-page")) {
    const donationId = path.split("/")[2];
    app.appendChild(Donation(navigate, donationId));
    return;
  }

  if (path === "/") {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search") || "";
    app.appendChild(Home(navigate, search));
    return;
  }
  if(path.startsWith("/admin-charity-donors")){
    const charityId = path.split("/")[2];
    app.appendChild(AdminViewCharityDonarList(navigate, charityId));
    return;
  } 
  switch (path) {
    case "/login":
      app.appendChild(Login(navigate));
      break;
    case "/sign-up":
      app.appendChild(SignUp(navigate));
      break;
    case "/profile":
      app.appendChild(Profile(navigate));
      break;
    case "/donation":
      app.appendChild(Profile(navigate));
      break;
    case "/donation-history":
      app.appendChild(DonationHistory(navigate));
      break;
    case "/payment":
      const params = new URLSearchParams(window.location.search);
      const organisationId = params.get("organisationId");
      app.appendChild(Payment(navigate,organisationId));
      break;
    case "/charity-registration":
      app.appendChild(Charity(navigate));
      break;
    case "/impact-report":
      app.appendChild(ImpactReports(navigate));
      break;
    case "/admin-dashboard":
      app.appendChild(AdminDashboard(navigate));
      break;
    case "/admin-allUsers":
      app.appendChild(AdminListUsers(navigate));
      break;
    case "/admin-charities":
      app.appendChild(AdminCharityList(navigate));
      break;
    case "/admin-getAllDonations":
      app.appendChild(AdminDonationList(navigate));
      break;
    default:
      app.innerHTML = "<h2>404 Page Not Found</h2>";
  }
}

export function navigate(route) {
  window.history.pushState({}, "", route);
  render(route);
}

window.addEventListener("popstate", () => {
  render(window.location.pathname + window.location.search);
});

function init() {
  const token = localStorage.getItem("token");
  const currentRoute = window.location.pathname + window.location.search;
  const path = window.location.pathname;

  // On a real page refresh, drop any leftover search query
  // if (window.location.search) {
  //   window.history.replaceState({}, "", currentRoute || "/");
  // }

  if (!token && !publicRoutes.includes(path)) {
    render("/login");
  } else {
    render(currentRoute || "/");
  }
}

init();