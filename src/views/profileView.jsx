import React from "react";
import AuthDetails from '../views/AuthDetails.jsx';
import { useNavigate } from "react-router-dom";

function ProfileView(props){
    const navigate = useNavigate();

    function clickLoginACB(){
        navigate("/profile");
    }

    function clickLogoACB(){
        navigate("/start");
    }

    return (
        <div className="container">
        <img onClick={clickLogoACB} src="/logov1.png" alt="logov1" width={"180"}></img>
        <div className="flex-row">
        <div> 
        {/* <img src="/images/travel.jpg" alt="travel" width={"520"}></img> */}
        </div>
        <div className="flex-column">  
            <div className="align-right">
            <AuthDetails onIconClicked={clickLoginACB}/>
            </div>
            <div className="item">
                <div className="profile-container">
                <h1>Hello on profile page!</h1>
                </div>
            </div>
        </div>   
    </div>
    </div>
    );

}


export default ProfileView;