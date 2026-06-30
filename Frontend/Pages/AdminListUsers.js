import { API_URL } from "../Src/Config.js";

export function AdminListUsers(navigate){

    const container = document.createElement("div");

    container.innerHTML = `

    <div class="admin-users-container">

        <div class="admin-users-card">

            <h1 class="admin-users-title">
                All Users
            </h1>

            <div class="admin-users-table-wrapper">

                <table class="admin-users-table">

                    <thead>

                        <tr>

                            <th>
                                ID
                            </th>

                            <th>
                                User Name
                            </th>

                            <th>
                                Account Created
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody id="admin-users-body">

                    </tbody>

                </table>

            </div>
        </div>
    </div>

    `;

    const tableBody = container.querySelector("#admin-users-body");

     async function loadUsers(){


        try{
            // const token = localStorage.getItem("token");

            const response = await axios.get(`${API_URL}/admin/users`);

            const users = response.data;

            tableBody.innerHTML="";

            if(users.length===0){

                tableBody.innerHTML=`

                    <tr>
                        <td colspan="4">
                            No users found
                        </td>
                    </tr>

                `;

                return;

            }

            users.forEach(user=>{

                const row=document.createElement("tr");

                row.innerHTML=`

                    <td>
                        ${user.id}
                    </td>


                    <td>
                        ${user.name}
                    </td>

                    <td>
                        ${new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                        <button class="delete-user-btn" data-id="${user.id}">Delete</button>
                    </td>

                `;
                const deleteBtn=row.querySelector(".delete-user-btn");

                deleteBtn.addEventListener("click",()=>{
                    deleteUser(user.id);
                });

                tableBody.appendChild(row);

            });

        }
        catch(err){
            console.log(err);
        }
    }

     async function deleteUser(id){

        const confirmDelete = confirm("Are you sure you want to delete this user?");

        if(!confirmDelete)
            return;

        try{

            const token = localStorage.getItem("token");

            await axios.delete(
                `${API_URL}/admin/user/${id}`,
                {

                    headers:{
                        Authorization:`Bearer ${token}`
                    }

                }
            );

            loadUsers();

        }
        catch(err){
            console.log(err);
        }
    }

    loadUsers();

    return container;

}