import React from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../reactjs/firebase-auth-hook.jsx";

function ProfileView(props){
    const navigate = useNavigate();
    const currentUser = useAuth();

    function handeluserSignOut(e){
        navigate('/')
        props.onUserSignOut()
    }  

    function handleGoHomeACB(e){
        navigate('/');
    }  

    return (
        <div className="App">
            {currentUser ? <div>
                <h1>Welcome on you profile page!</h1> 
                <p>Signed In as: {currentUser?.email}</p> 
                <button onClick={handeluserSignOut}>Sign Out</button>
            </div> : 
            <div>
                <p>You are: signed out</p> 
                <button onClick={handleGoHomeACB}>Go Home</button>
            </div>
            }
        </div>
    );

}


export default ProfileView;