import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../reactjs/firebase-auth-hook.jsx";

function AuthView(props){
    const [isSignUpShown, setIsSignUpShown] = useState(false);
    const [isSignInShown, setIsSignInShown] = useState(true);
    const [isLoggedInShown, setIsLoggedInShown] = useState(false);
    const currentUser = useAuth();
    const navigate = useNavigate();

    function changeEmailACB(e){
        props.onEmailChange(e.target.value)
      }
    function changePasswordACB(e){
        props.onPasswordChange(e.target.value)
    }  

    const handleSignUpClick = event => {
        setIsSignUpShown(true);
        setIsSignInShown(false);
        // navigate('/profile')
      };
    const handleSignInClick = event => {
        // setIsShown(current => !current);
        // 👇️ or simply set it to true
        setIsSignInShown(true);
        setIsSignUpShown(false);
        // navigate('/profile')
    };

    function handelGoProfileButton(e){
        navigate('/profile')
    }  
    function handelGoHomeButton(e){
        navigate('/')
    }  

    if (currentUser){
        return (
        <div>
            <p>You are allready signed In as: {currentUser?.email}</p> 
            <button onClick={handelGoProfileButton}>Go to your profile page</button>
            <button onClick={handelGoHomeButton}>Go home</button>
        </div>
        )
    }else {
        return (
            <div className="App">
                {isSignInShown && (
                    <div className="sign-in-container">
                        <form  onSubmit={props.onUserSignIn}>
                            <h1>Log In to account</h1>
                            <p >No account yet?<button onClick={handleSignUpClick}>Sign Up here</button></p>
                            <input type="email" placeholder="Enter your email" 
                                value={props.email}
                                onChange={changeEmailACB}  
                            ></input>
                            <input type="password" placeholder="Enter your password" 
                                value={props.password}
                                onChange={changePasswordACB}  
                            ></input>
                            <button type="submit" >Log In</button>
                            <button onClick={handelGoHomeButton}>Go home</button>
                        </form>
                    </div>
                )}
    
                {isSignUpShown && (
                    <div className="sign-up-container">
                        <form  onSubmit={props.onUserSignUp}>
                            <h1>Create account</h1>  
                            <p >All ready have an account? <button onClick={handleSignInClick}>Log In here</button></p> 
                            <input type="email" placeholder="Enter your email" 
                                value={props.email}
                                onChange={changeEmailACB}   
                            ></input>
                            <input type="password" placeholder="Enter your password" 
                                value={props.password}
                                onChange={changePasswordACB} 
                            ></input>
                            <button type="submit" >Sign Up</button>
                            <button onClick={handelGoHomeButton}>Go home</button>
                        </form>
                    </div>
                )}
            </div>
        );
    }


}  
export default AuthView;