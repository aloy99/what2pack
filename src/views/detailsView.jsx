import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import SearchBarView from "./searchBarView";
import UserIconView from './userIconView';
import { func } from "prop-types";

function DetailsView(props){
    const currentPlan = props.currentPlan;
    const defaultDest = (currentPlan === null) ? "" : currentPlan.destination;
    const defaultRange = (currentPlan === null) ? ["",""] : [currentPlan.startDate, currentPlan.endDate];
    const navigate = useNavigate();
    // const plans = props.plans;
    function passSearchInputACB(destination, startDate, endDate){
        msg = makeMsg(destination, startDate, endDate);
        document.getElementById("msg-details").innerText = msg;
        props.onSearchInput(destination, startDate, endDate);
    }
    function passDestACB(dest){
        props.onDestChanged(dest);
    }
    function passRangeACB(startDate, endDate){
        props.onRangeChanged(startDate, endDate);
    }
    function clickLoginACB(){
        navigate("/login");
    }
    function clickLogoACB(){
        props.onClickLogo();
        navigate("/");
    }
    return (
    <>
        <div className="logo-login-container">

            <div className="logo-item">
            <img 
                src="\logov1.png" 
                alt="What2Pack" 
                width="100" 
                height="100"
                onClick={clickLogoACB}>
            </img>
            </div>

            <div className="search-detail-item">
            <SearchBarView 

            id="search-bar-details" 
            defaultDest={defaultDest}
            defaultRange={defaultRange}
            onSearchInput={passSearchInputACB} 
            onDestChanged={passDestACB} 
            onRangeChanged={passRangeACB}/>
            </div>

            <div className="login-item">
            <UserIconView onIconClicked={clickLoginACB}/>
            </div>
            
        </div>
        <div className="login"></div>
    </>
    );
}

export default DetailsView;