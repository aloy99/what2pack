import React, {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth, useAuth} from "../firebaseModel";
import { useNavigate, Link } from "react-router-dom";
import AuthDetails from "./AuthDetails";


const SignIn = (props) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // const { signIn } = UserAuth();
    const currentUser = useAuth();

    const handleSignIn = (e) =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            navigate('/profile')
            console.log(userCredential);
            const user = userCredential.user;
          })
          .catch((error) => {
            console.log(error);
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    function clickLoginACB(){
        navigate("/profile");
    }

    function clickLogoACB(){
        navigate("/start");
    }


    return (
        <div class="container">
        <img onClick={clickLogoACB} src="/images/logov1.png" alt="logov1" width={"180"}></img>
        <div class="flex-row">
        <div> 
        <img src="/images/suitcases.png" alt="suitcases" width={"420"}></img>
        </div>
        <div class="flex-column">  
            <div class="align-right">
            <AuthDetails onIconClicked={clickLoginACB}/>
            </div>
            <div class="item">
                <div className="sign-in-container">
                    <form onSubmit={handleSignIn}>
                        <h1>Log In to account</h1>
                        <p >No account yet? <Link to="/signup"> Sign Up here</Link></p>   
                        <input type="email" placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}  

                        ></input>
                        <input type="password" placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}  
                        ></input>
                        <button type="submit" >Log In</button>
                        {/* <p>Currently loged in as: {currentUser?.email}</p>  */}
                    </form>
                </div>
            </div>
        </div>   
    </div>
    </div>
    );
}
export default SignIn;