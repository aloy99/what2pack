import React, {useState, useEffect} from "react";
import {onAuthStateChanged, getAuth} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {auth} from "../firebaseModel";

function ProfileView(props){
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


    function handeluserSignOut(e){
        navigate('/profile')
        props.onUserSignOut()
    }  

    function handelGoHome(e){
        navigate('/')
    }  

    return (
        <div className="App">
            {authUser ? <div>
                <p>Signed In as: {authUser?.email}</p> 
                <button onClick={handeluserSignOut}>Sign Out</button>
            </div> : 
            <div>
                <p>You are: signed out</p> 
                <button onClick={handelGoHome}>Go Home</button>
            </div>}
        </div>
    );

}


export default ProfileView;