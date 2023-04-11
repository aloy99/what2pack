import React, {useEffect, useState} from "react";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "../firebaseModel";
import { useNavigate, Link } from "react-router-dom";

const AuthDetails = () =>{
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user){
                setAuthUser(user)
            }else{
                setAuthUser(null);
            }
        });

        return () =>{
            listen();
        }
    }  ,[]);

        const userSignOut = () =>{
            signOut(auth).then(() =>{
                console.log("sign out succesfol")
            }).catch(error => console.log(error))
            navigate("/login");
        }


    return (
        <div>
            {/* ('Signed In as ${authUser.email}') */}
            {authUser ? <div>
                <p>Signed In as: {authUser?.email}</p> 
                <button onClick={userSignOut}>Sign Out</button>
            </div> : 
            <div>
                 <p>You are: signed out</p> 
            </div>}
        </div>
    )
}
export default AuthDetails;