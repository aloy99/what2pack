import React, {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () =>{
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const signUp = (e) =>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
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
    <div className="sign-up-container">
        <form onSubmit={signUp}>
            <h1>Create account</h1>   
            <p >All ready have an account? <Link to="/login"> Login here</Link></p>
            <input type="email" placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}  
            ></input>
            <input type="password" placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}  
            ></input>
            <button type="submit" >Sign Up</button>
        </form>
    </div>
    );
}
export default SignUp;