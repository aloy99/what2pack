import React from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import SearchBarView from "./searchBarView";
import UserIconView from './userIconView';

function DetailsView(props){
    const currentPlan = props.currentPlan;
    const defaultDest = (currentPlan === null) ? "" : currentPlan.destination;
    const defaultRange = (currentPlan === null) ? ["",""] : [dayjs(currentPlan.startDate), dayjs(currentPlan.endDate)];
    const navigate = useNavigate();
    let msg = "Packing suggestions for " + currentPlan.destination + " from " + currentPlan.startDate + " to " + currentPlan.endDate;
    function makeMsg(dest, start, end){
        return "Packing suggestions for " + dest + " from " + start + " to " + end;
    }
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
        navigate("/");
    }
    function itemInfoCB(item){
        return(
            <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{item.remark}</td>
            </tr>
        )
    }
    return (
    <>
        <img className="logo"
            src="public\assets\images\logo.jpg" 
            alt="What2Pack" 
            width="100" 
            height="100"
            onClick={clickLogoACB}>
        </img>
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
        <table className="items-table-details">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Remark</th>
                </tr>
            </thead>
            <tbody>
                {props.currentItems.map(itemInfoCB)}
            </tbody>
        </table>
    </>
    );
}

export default DetailsView;