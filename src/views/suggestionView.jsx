import React, { useState } from "react";
import AddButtonView from './addButtonView';
import { Popconfirm, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import useRerender from "../reactjs/useRerender";

function SuggestionView(props){
    const rerenderACB = useRerender();
    const currentPlan = props.currentPlan;
    const currentPlanAdded = props.currentPlanAdded;
    const [openPlanConfirm, setOpenPlanConfirm] = useState(false);
    const ifItemConfirmOpen = new Array(props.currentPlan.itemsCount).fill(false);
    const [openItemConfirm, setOpenItemConfirm] = useState(ifItemConfirmOpen);
    const showPlanPopconfirm = () => {
        setOpenPlanConfirm(true);
    };
    const closePlanPopconfirm = () => {
        setOpenPlanConfirm(false);
    };    
    const showItemPopconfirm = (item) => {
        const openItemConfirmNew = openItemConfirm;
        openItemConfirmNew[item.index] = true;
        setOpenItemConfirm(openItemConfirmNew);
        rerenderACB();
    };
    const closeItemPopconfirm = (item) => {
        const openItemConfirmNew = openItemConfirm;
        openItemConfirmNew[item.index] = false;
        setOpenItemConfirm(openItemConfirmNew);
        rerenderACB();
    };
    const defaultDest = (currentPlan === null) ? "" : currentPlan.destination;
    const defaultRange = (currentPlan === null) ? ["",""] : [currentPlan.startDate, currentPlan.endDate];
    let msg = "Packing suggestions for " + defaultDest + " from " + defaultRange[0] + " to " + defaultRange[1];
    function clickAddToPlanACB(){
        if(!currentPlanAdded){
            if (currentPlan.destination 
                && currentPlan.startDate 
                && currentPlan.endDate){
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
    function clickRemoveFromItemsACB(item){
        showItemPopconfirm(item);
    }
    function confirmDeleteItemACB(item){
        closeItemPopconfirm(item);
        props.onDeleteItem(item);
    }
    function cancelDeleteItemACB(item){
        closeItemPopconfirm(item);
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
                        onConfirm={() => confirmDeleteItemACB(item)}
                        onCancel={() => cancelDeleteItemACB(item)}
                        okText="Yes"
                        cancelText="No"
                        open={openItemConfirm[item.index]}>
                        <Button 
                            className="button-delete-item" 
                            type="primary" icon={<CloseOutlined/>} 
                            onClick={() => clickRemoveFromItemsACB(item)}/>
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