import { API_URL } from "../src/config.js";

export function Login(navigate) {

    const container = document.createElement('div');
    container.innerHTML = `
        <div class="login-container">
        <form id="form">
        <h2 id="login-title">Login</h2>

                <div id="emailDiv">

                    <label for="email">Email:</label>
                    <input type="email" id="email" placeholder="Enter your email" name="email" required>
                </div>


                <div id="passwordDiv">

                    <label for="password">Password:</label>
                    <input type="password" id="password" placeholder="Enter your password" name="password" required>
                </div>

                <button type="submit" id="button">Login</button>
                <br>
                <a href="/sign-up" id="signup-link">Not registered yet? Click sign-up here</a>
                
            </form>
        </div>
     `
    const errorExists = container.querySelector('#alert');
    const passwordDiv = container.querySelector('#passwordDiv');
    const inputPassword = container.querySelector('#password');
    const emailDiv = container.querySelector('#emailDiv');
    const inputEmail = container.querySelector('#email');
    const form = container.querySelector('#form');

    form.addEventListener('submit', async (e) => {



        try {

            e.preventDefault();

            const email = e.target.email.value;
            const password = e.target.password.value;

            const response = await axios.post(`${API_URL}/login`,
                {
                    email,
                    password
                }
            );
            if (!response.data.token) {
                throw new Error("No token received");
            }
            
            localStorage.setItem('token', response.data.token);
            // console.log()
            alert('Log in successfully');
            navigate("/");
        }
        catch (err) {
            console.log(err.response)
        }
    });
    container.querySelector('#signup-link').addEventListener('click', (e) => {
        e.preventDefault();
        navigate('/sign-up');

    });
    return container;
}