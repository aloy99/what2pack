import React, {useEffect, useState} from "react";
import { onAuthStateChanged, getAuth} from "firebase/auth";
import AuthView from "../views/authView.jsx";
import { useNavigate } from "react-router-dom";
import { signUp, signIn, signOut2 } from "../firebaseModel.js";
import useModelProp from './useModelProp.jsx';


function AuthPresenter(props){
    useModelProp(props.model, ["user"]); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    function handleEmailChangeACB(givenEmail) {
        setEmail(givenEmail);
      }
    function handlePasswordChangeACB(givenPassword) {
        setPassword(givenPassword);
      }  
    const handleUserSignOutACB = async () => {
      navigate('/profile')
      await signOut2();
      console.log("sign out Presenter successful");
    };

    const handleUserSignUp = async (e) => {
      e.preventDefault();
        setEmail("");
        setPassword("");
        const res = await signUp(email, password);
      if (res.error) setErrorMsg(res.error);
      console.log("res.error",res.error);
    };

    const handleUserSignIn = async (e) => {
     e.preventDefault();
      setEmail("");
      setPassword("");
      const res = await signIn(email, password);
      if (res.error) setErrorMsg(res.error);
      console.log("res.error",res.error);
      }; 

    return (
        <div className="App">
          <AuthView 
            // value={{user}}
            email={props.email}
            password={props.password}
            currentUser={props.model.user}
            errorMessage = {errMsg}
            onEmailChange= {handleEmailChangeACB}
            onPasswordChange={handlePasswordChangeACB}
            onUserSignIn={handleUserSignIn}
            onUserSignUp={handleUserSignUp}
            onUserSignOut={handleUserSignOutACB}
          />
        </div>
    );
}

export default AuthPresenter;