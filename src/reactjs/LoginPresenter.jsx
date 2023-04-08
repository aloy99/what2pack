import React from "react";
import SignIn from '../views/SignIn.jsx';

function LoginPresenter(props){
    // return <LoginView model={props.model}/>;


    return (
        <div className="App">
            <SignIn />
        </div>
    );
}

export default LoginPresenter;