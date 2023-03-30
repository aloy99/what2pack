import React from "react";
import dayjs from 'dayjs';
import UserIconView from './userIconView';
import SearchBarView from "./searchBarView";

function DetailsView(props){
    const currentPlan = props.model.currentPlan;
    const defaultDest = currentPlan.destination;
    const defaultRange = [dayjs(currentPlan.startDate), dayjs(currentPlan.endDate)];
    let msg = "Packing suggestions for " + currentPlan.destination + " from " + currentPlan.startDate + " to " + currentPlan.endDate;
    function makeMsg(dest, start, end){
        return "Packing suggestions for " + dest + " from " + start + " to " + end;
    }
    function passSearchInputACB(destination, startDate, endDate){
        // console.log("search input: ",destination, startDate, endDate);
        msg = makeMsg(destination, startDate, endDate);
        console.log(document.getElementById("msg-details"));
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
    return (
    <div>
        <UserIconView onIconClicked={clickLoginACB}/>
        <p id="msg-details">{msg}</p>
        <SearchBarView 
            id="search-bar-details" 
            defaultDest={defaultDest}
            defaultRange={defaultRange}
            onSearchInput={passSearchInputACB} 
            onDestChanged={passDestACB} 
            onRangeChanged={passRangeACB}
        />
        <p>something to bring</p>
        <p>something to bring</p>
        <p>something to bring</p>
        <p>something to bring</p>
        <p>something to bring</p>
        <p>something to bring</p>
    </div>);
}

export default DetailsView;