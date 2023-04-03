import React from "react";

function ProfileView(props){
    return (
    <div id="login">
        <div class="header">
            <h1>Create User With Email And Password</h1>
        </div>
        <form>    
            <div class="group">
                <input id="full_name" type="text"></input>
                <label>Full Name</label>
            </div>
            <div class="group">
                <input id="email" type="email"></input>
                <label>Email</label>
            </div>
            <div class="group">
                <input id="txtPassword" type="password"></input>
                <label>Password</label>
            </div>
            <div id="button_container">
                <button onclick="login()">Login</button>
                <button onclick="register()">Register</button>
            </div>
             
        </form>


    </div>
    
    
    );

}




export default ProfileView;