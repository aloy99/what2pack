import React from "react";
import ProfileView from '../views/profileView.jsx';
import PlansView from '../views/plansView.jsx';
import useModelProp from './useModelProp.jsx';
import {signOut} from "firebase/auth";
import useRerender from "./useRerender.jsx";
import {auth} from "../firebaseModel";
import {useAuth} from "../reactjs/firebase-auth-hook.jsx";

function ProfilePresenter(props){
    useModelProp(props.model, ["plans"]);
    const rerenderACB = useRerender();
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
        // console.log(props.model);
    } 
    function handleUndoDeletePlanACB(plan){
        props.model.addPlan(plan);
        rerenderACB();
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
                onUndoDeletePlan={handleUndoDeletePlanACB}
            />
        </>
    );
}

export default ProfilePresenter;