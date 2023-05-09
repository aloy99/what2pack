import React from "react";
import ProfileView from '../views/profileView.jsx';
import PlansView from '../views/plansView.jsx';
import useModelProp from './useModelProp.jsx';
import {signOut} from "firebase/auth";
import {auth} from "../firebaseModel";
import {useAuth} from "../reactjs/firebase-auth-hook.jsx";

function ProfilePresenter(props){
    useModelProp(props.model, ["plans"]);
    const handleUserSignOutACB = () =>{
        signOut(auth).then(() =>{
            console.log("sign out successful");
        }).catch(error => console.log(error));
    }
    function handleCurrentPlanChangeACB(plan){
        props.model.setCurrentPlan(plan);
    }
    function handleDeletePlanACB(){
        props.model.removePlan(props.model.currentPlan);
        console.log(props.model);
    } 
    return (
        <>
            <ProfileView 
                onUserSignOut={handleUserSignOutACB}
            />
            <PlansView 
                plans={props.model.plans}
                onCurrentPlanChanged={handleCurrentPlanChangeACB}
                onDeletePlan={handleDeletePlanACB}
            />
        </>
    );
}

export default ProfilePresenter;