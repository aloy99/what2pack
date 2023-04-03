import React, {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth, useAuth} from "../firebaseConfig";


const SignIn = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const currentUser = useAuth();

    const signIn = (e) =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
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
        <form onSubmit={signIn}>
            <h1>Log In to account</h1>   
            <input type="email" placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}  

            ></input>
            <input type="password" placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}  
            ></input>
            <button type="submit">Log In</button>
            <p>Currently loged in as: {currentUser?.email}</p> 
        </form>
    </div>
    );
}
export default SignIn;