import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../reactjs/firebase-auth-hook.jsx";

function ProfileView(props){
    const navigate = useNavigate();
    const currentUser = useAuth();

    function handleUserSignOutACB(e){
        navigate('/profile');
        props.onUserSignOut();
    }  

    function handleGoHomeACB(e){
        navigate('/');
    }  

    return (
        <div className="App">
            {authUser ? <div>
                <p>Signed In as: {authUser?.email}</p> 
                <button onClick={handleUserSignOutACB}>Sign Out</button>
            </div> : 
            <div>
                <p>You are: signed out</p> 
                <button onClick={handleGoHomeACB}>Go Home</button>
            </div>}
        </div>
    );

}


export default ProfileView;