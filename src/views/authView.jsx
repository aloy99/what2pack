import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../reactjs/firebase-auth-hook.jsx";
import { Popconfirm } from "antd";

function AuthView(props){
    const [isSignUpShown, setIsSignUpShown] = useState(false);
    const [isSignInShown, setIsSignInShown] = useState(true);
    const [isLoggedInShown, setIsLoggedInShown] = useState(false);
    const [openAuthError, setOpenAuthError] = useState(false);

    console.log(/(?<=auth\/)[a-z-]*/.exec(props.errorMessage));
    const showAuthErrorCB = () => {
        if (props.errorMessage){
        setOpenAuthError(true);
        }
    };
    const closeAuthErrorCB = () => {
        setOpenAuthError(false);
    };   
    const currentUser = useAuth();
    const navigate = useNavigate();

    function changeEmailACB(e){
        props.onEmailChange(e.target.value);
      }
    function changePasswordACB(e){
        props.onPasswordChange(e.target.value);
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

    function handleuserSignOutACB(e){
        navigate('/')
        props.onUserSignOut();
    }  

    if (currentUser){
        return (
        <div>
            <p>You are signed in as: {currentUser?.email}</p> 
            <button onClick={handleuserSignOutACB}>Sign Out</button>
        </div>
        )
    }else {
        return (
            <div className="App">
                {isSignInShown && (
                    <div className="login-page-wrapper">
                        <div className="login-row">
                            <div className="login-column">
                                <div className="loginL-column"> 
                                </div>
                            </div>
                            <div className="login-column">
                                <div className="loginR-column">  
                                    <form  className="" onSubmit={props.onUserSignIn}>
                                        <h1>Log In to account</h1>
                                        <p >No account yet?<button className="sign-button" onClick={handleSignUpClick}>Sign Up here</button></p>
                                        <label for="email">Email</label>
                                        <input type="email" placeholder="Enter your email" 
                                            value={props.email}
                                            onChange={changeEmailACB}  
                                        ></input>
                                         <label for="password">Password</label>
                                         <input type="password" placeholder="Enter your password" 
                                            value={props.password}
                                            onChange={changePasswordACB}  
                                        ></input>
                                        <button className="login-button" type="submit" onClick={showAuthErrorCB}>Log In</button>
                                        <div className="auth-error">{props.errorMessage ? /(?<=auth\/)[a-z-]*/.exec(props.errorMessage)[0].replaceAll('-',' ') :''}</div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
    
                {isSignUpShown && (
                    <div className="login-page-wrapper">
                        <div className="login-row">
                            <div className="login-column">
                                <div className="loginL-column"> 
                                </div>
                                  </div>
                            <div className="login-column">
                                <div className="loginR-column">  
                                    <form  onSubmit={props.onUserSignUp}>
                                        <h1>Create account</h1>  
                                        <p >All ready have an account? <button className="sign-button"  onClick={handleSignInClick}>Log In here</button></p> 
                                        <label for="email">Email</label>
                                        <input type="email" placeholder="Enter your email" 
                                            value={props.email}
                                            onChange={changeEmailACB}   
                                        ></input>
                                        <label for="password">Password</label>
                                        <input type="password" placeholder="Enter your password" 
                                            value={props.password}
                                            onChange={changePasswordACB} 
                                        ></input>
                                        <button className="login-button" type="submit" >Sign Up</button>
                                        <div className="auth-error">{props.errorMessage ? /(?<=auth\/)[a-z-]*/.exec(props.errorMessage)[0].replaceAll('-',' ') :''}</div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }


}  
export default AuthView;