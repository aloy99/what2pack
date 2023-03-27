import React from "react";
import ProfileView from '../views/profileView.jsx';

function ProfilePresenter(props){
    return <ProfileView model={props.model}/>;
}

export default ProfilePresenter;