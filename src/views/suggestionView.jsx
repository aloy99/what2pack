import React, { useState } from "react";
import AddButtonView from './addButtonView';
import { Popconfirm } from 'antd';

function SuggestionView(props){
    const currentPlan = props.currentPlan;
    console.log(props.currentPlan);
    const currentPlanAdded = props.currentPlanAdded;
    const [open, setOpen] = useState(false);
    const showPopconfirm = () => {
        setOpen(true);
    };
    const closePopconfirm = () => {
        setOpen(false);
    };
    const defaultDest = (currentPlan === null) ? "" : currentPlan.destination;
    const defaultRange = (currentPlan === null) ? ["",""] : [currentPlan.startDate, currentPlan.endDate];
    
    let msg = "Packing suggestions for " + defaultDest + " from " + defaultRange[0] + " to " + defaultRange[1];
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

export default SuggestionView;