import React, {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth, useAuth} from "../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";


const SignIn = () =>{
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


    return (
    <div className="sign-in-container">
        <form onSubmit={handleSignIn}>
            <h1>Log In to account</h1>
            <p >No account yet? <Link to="/login"> Sign Up here</Link></p>   
            <input type="email" placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}  

            ></input>
            <input type="password" placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}  
            ></input>
            <button type="submit" >Log In</button>
            <p>Currently loged in as: {currentUser?.email}</p> 
        </form>
    </div>
    );
}
export default SignIn;