import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import SearchBarView from "./searchBarView";
import UserIconView from './userIconView';
import AddButtonView from './addButtonView';
import { Popconfirm } from 'antd';
import { func } from "prop-types";

function DetailsView(props){
    const currentPlan = props.currentPlan;
    console.log(props.currentPlan)
    const currentPlanAdded = props.currentPlanAdded;
    // const plans = props.plans;
    const [open, setOpen] = useState(false);
    const showPopconfirm = () => {
        setOpen(true);
    };
    const closePopconfirm = () => {
        setOpen(false);
    };
    const defaultDest = (currentPlan === null) ? "" : currentPlan.destination;
    const defaultRange = (currentPlan === null) ? ["",""] : [dayjs(currentPlan.startDate), dayjs(currentPlan.endDate)];
    const navigate = useNavigate();
    let msg = "Packing suggestions for " + defaultDest + " from " + defaultRange[0] + " to " + defaultRange[1];
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
    function clickAddToPlanACB(){
        if(!currentPlanAdded){
            if (currentPlan.destination !== null 
                && currentPlan.startDate !== null 
                && currentPlan.endDate !== null){
                    props.onAddPlan();
                }
        }
    }
    function clickRemoveFromPlanACB(){
        showPopconfirm();
    }
    function confirmDeleteACB(){
        props.onDeletePlan();
        closePopconfirm();
    }
    function cancelDeleteACB(){
        closePopconfirm();
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
            src="assets\images\logo.jpg" 
            alt="What2Pack" 
            width="100" 
            height="100"
            onClick={clickLogoACB}>
        </img>
        <UserIconView onIconClicked={clickLoginACB}/>
        <SearchBarView 
            id="search-bar-details" 
            defaultDest={defaultDest}
            defaultRange={defaultRange}
            onSearchInput={passSearchInputACB} 
            onDestChanged={passDestACB} 
            onRangeChanged={passRangeACB}
        />
        <p id="msg-details">{msg}</p>
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
        <Popconfirm
            title="Are you sure to delete this plan?"
            description=""
            onConfirm={confirmDeleteACB}
            onCancel={cancelDeleteACB}
            okText="Yes"
            cancelText="No"
            disabled={!currentPlanAdded}
            open={open}
            >
            <AddButtonView 
                currentPlanAdded={currentPlanAdded}
                onDeletePlan={clickRemoveFromPlanACB}
                onAddPlan={clickAddToPlanACB}/>
        </Popconfirm>
    </>
    );
}

export default DetailsView;