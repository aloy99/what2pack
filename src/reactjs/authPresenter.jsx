import React, {useEffect, useState} from "react";
import { onAuthStateChanged, getAuth} from "firebase/auth";
import AuthView from "../views/authView.jsx";
import { useNavigate } from "react-router-dom";
import { signUp, signIn, signOut2 } from "../firebaseModel.js";


function AuthPresenter(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});
    const [errMsg, setErrorMsg] = useState('');
    const auth = getAuth();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
          return unsub;
        },[]);

    function handleEmailChangeACB(givenEmail) {
        setEmail(givenEmail);
      }
    function handlePasswordChangeACB(givenPassword) {
        setPassword(givenPassword);
      }  
    const handleUserSignOutACB = async () => {
      await signOut2();
      console.log("sign out NEW successful");
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
            value={{user}}
            email={props.email}
            password={props.password}
            currentUser={currentUser}
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