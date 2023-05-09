import React from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../reactjs/firebase-auth-hook.jsx";
import { useState, useEffect } from 'react';
// import { addTrip, getTrips } from '../firestoreModel.js';

function ProfileView(props){
    const navigate = useNavigate();
    const currentUser = useAuth();
    const [isLoadingTrips, setIsLoadingTrips] = useState(true);
    const [trips, setTrips] = useState([]);

    function handleuserSignOutACB(e){
        navigate('/')
        props.onUserSignOut();
    }  

    function handleGoHomeACB(e){
        navigate('/');
        // console.log(getTrips(currentUser.uid, setTrips, setIsLoadingTrips));
        // getTrips(currentUser.uid, setTrips, setIsLoadingTrips);
    }  

    return (
        <div className="App">
            {
                currentUser ? <div>
                    <h1>Welcome to your profile page!</h1> 
                    <p>Signed In as: {currentUser?.email}</p> 
                    <p>Signed In as: {currentUser?.uid}</p> 
                    <button onClick={handleuserSignOutACB}>Sign Out</button>
                    <button onClick={handleGoHomeACB}>Show user database info:</button>
                    {/* <button onClick={handleSubmit} >  Submit </button> */}
                    {/* <div> 
                    {trips.length > 0 ? (
                            trips.map((trip) => <p key={trip.id}>uid:
                                {trip.id} id:  
                                {trip.uid} des:  
                                {trip.locationName} sd:  
                                {trip.startDate} ed:  
                                {trip.endDate}  
                            </p>)
                        ) : (
                            <h1>no answers yet :</h1>
                        )}
                      </div> */}
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