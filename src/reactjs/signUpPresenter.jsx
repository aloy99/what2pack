import React from "react";
import SignUp from '../views/SignUp.jsx';
import AuthDetails from '../views/AuthDetails.jsx';

function signUpPresenter(props){
    // return <LoginView model={props.model}/>;


    return (
        <div className="App">
            <SignUp />
            {/* <AuthDetails /> */}
        </div>
    );
}

export default signUpPresenter;