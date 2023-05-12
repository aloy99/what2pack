import React from "react";
import { useNavigate } from "react-router-dom";
// import {useAuth} from "../reactjs/firebase-auth-hook.jsx";
import { useState, useEffect } from 'react';

function ProfileView(props){
    const navigate = useNavigate();
    // const currentUser = useAuth();
    const [isLoadingTrips, setIsLoadingTrips] = useState(true);
    const [trips, setTrips] = useState([]);

    function handleuserSignOutACB(e){
        navigate('/')
        props.onUserSignOut();
    }  

    function handleGoHomeACB(e){
        navigate('/');
    }  

    return (
        <div className="App">
            {
                // props.currentUser ? <div>
                //     <h1 className="profileViewH1">All your saved trips</h1> 
                //     </div> : 
                //     <div>
                //         <p>You are: signed out</p> 
                //         <button onClick={handleGoHomeACB}>Go Home</button>
                //     </div>
            }
        </div>
    );

}


export default ProfileView;