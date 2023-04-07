import React from "react";
import useModelProp from './useModelProp.jsx';
import LoginView from '../views/LoginView.jsx';
import SignIn from '../views/SignIn.jsx';
import SignUp from '../views/SignUp.jsx';
import AuthDetails from '../views/AuthDetails.jsx';
import UserIconView from '../views/userIconView';

function LoginPresenter(props){
    // return <LoginView model={props.model}/>;


    return (
        <div className="App">
            <SignIn />
            <SignUp />
            <AuthDetails />
        </div>
    );
}

export default LoginPresenter;