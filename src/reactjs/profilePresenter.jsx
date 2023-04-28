import React from "react";
import ProfileView from '../views/profileView.jsx';
import PlansView from '../views/plansView.jsx';
import {signOut} from "firebase/auth";
import {auth} from "../firebaseModel";
import {useAuth} from "../reactjs/firebase-auth-hook.jsx";

function ProfilePresenter(props){

    const handleUserSignOutACB = () =>{
        signOut(auth).then(() =>{
            console.log("sign out successful");
        }).catch(error => console.log(error));
    }
    function handleCurrentPlanChangeACB(plan){
        props.model.setCurrentPlan(plan);
    }

    return (
        <>
            <ProfileView 
                onUserSignOut={handleUserSignOutACB}
                // plans={props.model.plans}
            />
            <PlansView 
                plans={props.model.plans}
                onCurrentPlanChanged={handleCurrentPlanChangeACB}
            />
        </>
    );
}

export default ProfilePresenter;