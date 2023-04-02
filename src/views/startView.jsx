import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBarView from "./searchBarView";
import UserIconView from './userIconView';

function StartView(props){
    const navigate = useNavigate();
    function passSearchInputACB(destination, startDate, endDate){
        console.log("search input: ",destination, startDate, endDate);
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
    return (
     <div class="flex item">
            <img src="/images/travel.jpg" alt="travel" width={"500"}></img>
        <div class="item">  
        <UserIconView onIconClicked={clickLoginACB}/>
        <h1>What to pack?</h1>
        <h3>Pack the insights into your holidays</h3>
        <SearchBarView 
            id="search-bar-start" 
            onSearchInput={passSearchInputACB} 
            onDestChanged={passDestACB} 
            onRangeChanged={passRangeACB}/>
        </div>   
        </div>);
}   

export default StartView;