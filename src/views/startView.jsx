import React from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import SearchBarView from "./searchBarView";
import UserIconView from './userIconView';

function StartView(props){
    const currentPlan = props.currentPlan;
    const defaultDest = (currentPlan === null) ? "" : currentPlan.destination;
    const defaultRange = (currentPlan === null) ? ["",""] : [dayjs(currentPlan.startDate), dayjs(currentPlan.endDate)];
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
    function clickLoginACB(){
        navigate("/login");
    }
    function clickLogoACB(){
        navigate("/");
    }
    return (
     <div className="flex-row">
        <div> 
        <img src="/images/travel.jpg" alt="travel" width={"520"}></img>
        </div>
        <div className="flex-column">  
            <div className="align-right">
            <UserIconView onIconClicked={clickLoginACB}/>
            </div>
            <div className="item">
                <h1>What to pack?</h1>
                <h3>Pack the insights into your holidays</h3>
                    <SearchBarView 
                id="search-bar-start" 
                onSearchInput={passSearchInputACB} 
                onDestChanged={passDestACB} 
                onRangeChanged={passRangeACB}/>
            </div>
        </div>   
    </div>);
}   

export default StartView;