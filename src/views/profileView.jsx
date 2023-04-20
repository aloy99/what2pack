import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../reactjs/firebase-auth-hook.jsx";

function ProfileView(props){
    const navigate = useNavigate();
    const currentUser = useAuth();

    function handeluserSignOut(e){
        navigate('/profile')
        props.onUserSignOut()
    }  

    function handelGoHome(e){
        navigate('/')
    }  

    return (
        <div className="App">
            {currentUser ? <div>
                <p>Signed In as: {currentUser?.email}</p> 
                <button onClick={handeluserSignOut}>Sign Out</button>
            </div> : 
            <div>
                <p>You are: signed out</p> 
                <button onClick={handelGoHome}>Go Home</button>
            </div>}
        </div>
    );

}


export default ProfileView;