import React, { useState } from "react";
import AddButtonView from './addButtonView';
import { Popconfirm, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

function SuggestionView(props){
    const currentPlan = props.currentPlan;
    const currentPlanAdded = props.currentPlanAdded;
    const [openPlanConfirm, setOpenPlanConfirm] = useState(ifItemConfirmOpen);
    const [openItemConfirm, setOpenItemConfirm] = useState(false);
    var ifItemConfirmOpen = new Array(props.currentPlan.items.length).fill(false);
    const showPlanPopconfirm = () => {
        setOpenPlanConfirm(true);
    };
    const closePlanPopconfirm = () => {
        setOpenPlanConfirm(false);
    };    
    const showItemPopconfirm = () => {
        setOpenItemConfirm(true);
    };
    const closeItemPopconfirm = () => {
        setOpenItemConfirm(false);
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
        showPlanPopconfirm();
    }
    function confirmDeletePlanACB(){
        closePlanPopconfirm();
        props.onDeletePlan();
    }
    function cancelDeletePlanACB(){
        closePlanPopconfirm();
    }
    function clickRemoveFromItemsACB(){
        showItemPopconfirm();
    }
    function confirmDeleteItemACB(){
        closeItemPopconfirm();
        props.onDeleteItem(item);
    }
    function cancelDeleteItemACB(){
        closeItemPopconfirm();
    }
    function itemCheckedACB(evt){
        props.onItemChecked(evt.target.value, evt.target.checked);
    }
    function chooseAllACB(evt){
        const ifCheckAll = evt.target.checked; //if true, 'Check All' checkbox; if false, 'Uncheck All' checkbox.
        const checkboxes = document.getElementsByClassName("checkbox-suggestion");
        for(const checkbox of checkboxes){
            checkbox.checked = ifCheckAll;
        }
        if(ifCheckAll){
            props.onAllItemsChecked(true);
        }   
        else{
            props.onAllItemsChecked(false);
        }
    }
    function itemInfoCB(item){
        return(
            <tr key={item.name}>
                <td>
                    <Popconfirm
                        title="Are you sure to delete this item?"
                        description=""
                        onConfirm={confirmDeleteItemACB}
                        onCancel={cancelDeleteItemACB}
                        okText="Yes"
                        cancelText="No"
                        open={openItemConfirm}>
                        <Button className="button-delete-item" type="primary" icon={<CloseOutlined/>} onClick={() => clickRemoveFromItemsACB(item)}/>
                    </Popconfirm>
                </td>
                <td><input type="checkbox" className="checkbox-suggestion" onChange={itemCheckedACB} value={item.name}/></td>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{item.remark}</td>
            </tr>
        )
    }
    return (
        <>
            <p id="msg-details">
                {msg}
                <Popconfirm
                    title="Are you sure to delete this plan?"
                    description=""
                    onConfirm={confirmDeletePlanACB}
                    onCancel={cancelDeletePlanACB}
                    okText="Yes"
                    cancelText="No"
                    disabled={!currentPlanAdded}
                    open={openPlanConfirm}
                    >
                    <AddButtonView 
                        currentPlanAdded={currentPlanAdded}
                        onDeletePlan={clickRemoveFromPlanACB}
                        onAddPlan={clickAddToPlanACB}/>
                </Popconfirm>
            </p>
            <table className="items-table-details">
                <thead>
                    <tr>
                        <th></th>
                        <th>
                            <input id="checkbox-check-all" type="checkbox" onClick={chooseAllACB}/>
                            <label htmlFor="checkbox-check-all" id="checkbox-check-all-label">All</label>
                        </th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>Packed</th>
                        <th>Item</th>
                        <th>Amount</th>
                        <th>Remark</th>
                    </tr>
                </thead>
                <tbody>
                    {props.currentPlan.items.map(itemInfoCB)}
                </tbody>
            </table>

        </>
    );
}

export default SuggestionView;