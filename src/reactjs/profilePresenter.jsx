import React from "react";
import ProfileView from '../views/profileView.jsx';
import {signOut} from "firebase/auth";
import {auth} from "../firebaseModel";

function ProfilePresenter(props){

    const handleUserSignOutACB = () =>{
        signOut(auth).then(() =>{
            console.log("sign out successful");
        }).catch(error => console.log(error));
    }

    return (
            <ProfileView 
                onUserSignOut={handleUserSignOutACB}
            />
    );
}

export default ProfilePresenter;