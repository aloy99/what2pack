import React from "react";
import SignIn from '../views/SignIn.jsx';
import SignUp from '../views/SignUp.jsx';
import AuthDetails from '../views/AuthDetails.jsx';
// import ProfileView from '../views/profileView.jsx';

function ProfilePresenter(props){
    return (
        <div className="App">
            <SignIn />
            <SignUp />
            <AuthDetails />
        </div>
    );
    // return <ProfileView model={props.model}/>;
}

export default ProfilePresenter;