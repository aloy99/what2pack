import React from "react";
import useModelProp from './useModelProp.jsx';
import LoginView from '../views/LoginView.jsx';

function LoginPresenter(props){
    return <LoginView model={props.model}/>;
}

export default LoginPresenter;