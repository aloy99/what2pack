import React, {useEffect, useState} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getAuth} from "firebase/auth";
import {auth} from "../firebaseModel";
import AuthView from "../views/authView.jsx";
import { useNavigate } from "react-router-dom";

function AuthPresenter(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});
    const auth = getAuth();

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
          })
          .catch((error) => {
            console.log(error);
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    const handleUserSignIn = (e) =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Log In!")
            navigate('/profile')
          })
          .catch((error) => {
            console.log(error);
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }      

    return (
        <div className="App">
            <AuthView 
            value={{user}}
            email={props.email}
            password={props.password}
            currentUser={props.currentUser}
            onEmailChange={handleEmailChangeACB}
            onPasswordChange={handlePasswordChangeACB}
            onUserSignIn={handleUserSignIn}
            onUserSignUp={handleUserSignUp}
            // onUserSignOut={handleUserSignOutACB}
            />
        </div>
    );
}

export default AuthPresenter;