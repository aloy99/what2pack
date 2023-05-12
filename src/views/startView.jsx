import React from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import SearchBarView from "./searchBarView";
import UserIconView from './userIconView';

function StartView(props){
    const currentPlan = props.currentPlan;
    const navigate = useNavigate();

    function passSearchInputACB(destination, startDate, endDate){
        props.onSearchInput(destination, startDate, endDate);
        navigate("/details");
    }
    function passDestACB(dest){
        props.onDestChanged(dest);
    }
    function passRangeACB(startDate, endDate){
        props.onRangeChanged(startDate, endDate);
    }
    function setValueACB(args){
        props.setValue.apply(null,arguments)
    }
    function passLocationClickACB(dest_value){
        props.onLocationClick(dest_value)
    }
    // function clickLoginACB(){
    //     navigate("/login");
    // }
    // function clickLogoACB(){
    //     props.onClickLogo();
    //     navigate("/");
    // 
    return (
    <div className="startOutside-container">
        <div className="start-container">
            <div className="startL-container"> 
            {/* <img src="/travel.png" alt="travel" width="100%" height="100%"></img> */}
            </div>
            <div className="startR-container">  
                <div className="login-item">
                {/* <UserIconView onIconClicked={clickLoginACB}/> */}
                </div>
                <div className="searchblock-item">
                    <h1>What to pack?</h1>
                    <h3>Pack the insights into your holidays</h3>
                    <SearchBarView 
                        id="search-bar-start" 
                        gmapsLoaded = {props.gmapsLoaded}
                        onSearchInput={passSearchInputACB} 
                        onDestChanged={passDestACB} 
                        onRangeChanged={passRangeACB}
                        locationSuggestions={props.locationSuggestions}
                        destValue={props.destValue}
                        onLocationClicked={passLocationClickACB}
                        setValue={setValueACB}
                    />
                </div>
            </div>
        </div>     
    </div>
    );
}   

export default StartView;