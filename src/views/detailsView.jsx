import React from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import SearchBarView from "./searchBarView";
import UserIconView from './userIconView';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function DetailsView(props){
    const currentPlan = props.currentPlan;
    const plans = props.plans;
    const defaultDest = (currentPlan === null) ? "" : currentPlan.destination;
    const defaultRange = (currentPlan === null) ? ["",""] : [dayjs(currentPlan.startDate), dayjs(currentPlan.endDate)];
    const navigate = useNavigate();
    let msg = "Packing suggestions for " + currentPlan.destination + " from " + currentPlan.startDate + " to " + currentPlan.endDate;
    function makeMsg(dest, start, end){
        return "Packing suggestions for " + dest + " from " + start + " to " + end;
    }
    function passSearchInputACB(destination, startDate, endDate){
        const isPlanAdded = ifPlanAdded(currentPlan, plans);
        console.log(isPlanAdded);
        setButtonAddToPlan(isPlanAdded);
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
    function setButtonAddToPlan(isPlanAdded){
        const buttonAddToPlan = document.querySelector(".button-add-to-plan-detail");
        if(buttonAddToPlan !== null){
            if (isPlanAdded){
                buttonAddToPlan.icon = <CheckOutlined/>;
                buttonAddToPlan.innerText = "Already in my plans";
            }
            else{
                buttonAddToPlan.icon = <PlusOutlined/>;
                buttonAddToPlan.innerText = "Add to my plans";
            }
        }
    }
    function ifPlanAdded(planToAdd, plans){
        console.log(planToAdd);
        console.log(plans);
        for (const p of plans){
            if(p.destination === planToAdd.destination 
                && p.startDate === planToAdd.startDate 
                && p.endDate === planToAdd.endDate){
                    return true;
                }
            }
        return false;
    }
    function clickAddToPlanACB(){
        console.log("Add to my plans:", currentPlan);
        if (currentPlan.destination !== null 
            && currentPlan.startDate !== null 
            && currentPlan.endDate !== null){
                props.onAddPlan();
                const isPlanAdded = ifPlanAdded(currentPlan, plans);
                console.log(isPlanAdded);
                setButtonAddToPlan(isPlanAdded);
            }
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
        <Button 
            className="button-add-to-plan-detail"
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={clickAddToPlanACB} >
            Add to my plans
        </Button>
    </>
    );
}

export default DetailsView;