import React from "react";
import ProfileView from '../views/profileView.jsx';
import PlansView from '../views/plansView.jsx';
import useModelProp from './useModelProp.jsx';
import useRerender from "./useRerender.jsx";
import {signOut2} from "../firebaseModel";

function ProfilePresenter(props){
    useModelProp(props.model, ["plans"]);
    const rerenderACB = useRerender();
    const handleUserSignOutACB = () =>{
        signOut2().then(() =>{
            console.log("sign out successful");
        }).catch(error => console.log(error));
    }
    function handleCurrentPlanChangeACB(plan){
        props.model.setCurrentPlan(plan);
        rerenderACB();
    }
    function handleDeletePlanACB(plan){
        props.model.removePlan(plan);
        rerenderACB();
        // console.log("model",props.model);
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