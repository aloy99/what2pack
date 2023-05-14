import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";


function AuthView(props){
    const [isSignUpShown, setIsSignUpShown] = useState(false);
    const [isSignInShown, setIsSignInShown] = useState(true);
    const [isLoggedInShown, setIsLoggedInShown] = useState(false);
    const [openAuthError, setOpenAuthError] = useState(false);

    // console.log(/(?<=auth\/)[a-z-]*/.exec(props.errorMessage));

    const showAuthErrorCB = () => {
        if (props.errorMessage){
        setOpenAuthError(true);
        }
    };
    const closeAuthErrorCB = () => {
        setOpenAuthError(false);
    };   

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
      };
    const handleSignInClick = event => {
        setIsSignInShown(true);
        setIsSignUpShown(false);
    };

    function handleuserSignOutACB(e){
        navigate('/')
        props.onUserSignOut();
        console.log("LOG OUT CLICK")
    }  

    if (props.currentUser){
        return (
        <div>
            <p>You are signed in as: {props.currentUser?.email}</p> 
            <p class="signout-button" onClick={handleuserSignOutACB}>Sign Out</p>
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
                                        <label htmlFor="email">Email</label>
                                        <input type="email" placeholder="Enter your email" 
                                            value={props.email}
                                            onChange={changeEmailACB}  
                                        ></input>
                                         <label htmlFor="password">Password</label>
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
                                        <label htmlFor="email">Email</label>
                                        <input type="email" placeholder="Enter your email" 
                                            value={props.email}
                                            onChange={changeEmailACB}   
                                        ></input>
                                        <label htmlFor="password">Password</label>
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