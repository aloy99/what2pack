import React, {useEffect, useState} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getAuth} from "firebase/auth";
import {auth} from "../firebaseModel";
import AuthView from "../views/authView.jsx";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../reactjs/firebase-auth-hook.jsx";

function AuthPresenter(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});
    const [errMsg, setErrorMsg] = useState('');
    const auth = getAuth();
    const currentUser = useAuth();

    const navigate = useNavigate();

    function handleEmailChangeACB(givenEmail) {
        setEmail(givenEmail);
      }
    function handlePasswordChangeACB(givenPassword) {
        setPassword(givenPassword);
      }  

    const handleUserSignUp = (e) =>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Sign Up!")
            navigate('/profile')
            setErrorMsg()
          })
          .catch((error) => {
            console.log(error);
            setErrorMsg(error.message);
        });
    }

    const handleUserSignIn = (e) =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Log In!")
            navigate('/profile')
            setErrorMsg()
          })
          .catch((error) => {
            console.log(error);
            setErrorMsg(error.message);
            console.log(errMsg)
        });
    }      

    return (
        <div className="App">
                 <AuthView 
              value={{user}}
              email={props.email}
              password={props.password}
              currentUser={props.currentUser}
              errorMessage = {errMsg}
              onEmailChange= {handleEmailChangeACB}
              onPasswordChange={handlePasswordChangeACB}
              onUserSignIn={handleUserSignIn}
              onUserSignUp={handleUserSignUp}
              // onUserSignOut={handleUserSignOutACB}
              />

        </div>
    );
}

export default AuthPresenter;