import React, { useState } from "react";
import AddButtonView from './addButtonView';
import { Popconfirm, Button, Input } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import useRerender from "../reactjs/useRerender";

function SuggestionView(props){
    const rerenderACB = useRerender();
    const currentPlanAdded = props.currentPlanAdded;
    const [openPlanConfirm, setOpenPlanConfirm] = useState(false);
    const ifItemConfirmOpen = props.currentPlan.items.map(it => it.ifDeleteConfirmOpen);
    // console.log("ifItemConfirmOpen: ", ifItemConfirmOpen);
    // const ifItemConfirmOpen = new Array(props.currentPlan.itemsCount).fill(false);
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
    function makeMsg(dest, start, end){
        return dest + ", " + start + " - " + end;
    }
    const defaultDest = (props.currentPlan) ?  props.currentPlan.destination : "";
    const defaultRange = (props.currentPlan) ? [props.currentPlan.startDate, props.currentPlan.endDate] : ["",""];
    const msg = makeMsg(defaultDest, defaultRange[0], defaultRange[1]);
    function clickAddToPlanACB(){
        if(!currentPlanAdded){
            if (props.currentPlan.destination 
                && props.currentPlan.startDate 
                && props.currentPlan.endDate){
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
    function clickAddItemACB(){
        const inputName = document.getElementById("input-add-item-name");
        const inputAmount = document.getElementById("input-add-item-amount");
        const inputRemark = document.getElementById("input-add-item-remark");
        const item = {
            name: inputName.value,
            amount: inputAmount.value,
            remark: inputRemark.value,
            ifPacked: false,
            index: props.currentPlan.items.length,
            ifDeleteConfirmOpen: false
        }
        for(const it of props.currentPlan.items)
        {
            if(it.name == item.name){
                notification.open({
                    message: `${it.name} already exists in current plan.`,
                    description:''
                });
                return;
            }
        }
        ifItemConfirmOpen.push(false);
        props.onAddItem(item);
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
        function changeAmountACB(evt){
            props.onAmountChange(item, Number(evt.target.value));
        }
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
                            type="text" 
                            // style={{ background: "#ecd8b2", borderColor: "#ecd8b2" }}
                            size="small"
                            shape="circle"
                            icon={<MinusCircleOutlined/>} 
                            onClick={() => clickRemoveFromItemsACB(item)}/>
                    </Popconfirm>
                </td>

{/* <td><input type="checkbox" className="checkbox-suggestion" onChange={itemCheckedACB} value={item.name}/></td> */}
                <td>{item.name}</td>
                {/* <td>{item.amount}</td> */}
                <td>
                    <input  
                        type="checkbox" 
                        className="checkbox-suggestion"
                        onChange={itemCheckedACB} 
                        value={item.name}
                        />
                </td>
                <td>{item.name}</td>
                <td>
                    <input 
                        type="number" 
                        className="input-amount" 
                        defaultValue={item.amount}
                        onChange={changeAmountACB}/>
                </td>

                <td>{item.remark}</td>
                <td><input type="checkbox" className="checkbox-suggestion" onChange={itemCheckedACB} value={item.name}/></td>
            </tr>
        )
    }
    function holidaysInfoCB(holiday){
        return(
            <tr key={holiday.name}>
                <td>{holiday.date}</td>
                <td>{holiday.name}</td>
            </tr>
        );
    }
    const addItemRow = (
        <tr>
            <th>                        
                <Button 
                    className="button-add-item" 
                    type="primary" icon={<PlusOutlined/>} 
                    onClick={() => clickAddItemACB()}/>
            </th>
            <th></th>
            <th><Input type="text" className="input-add-item" id="input-add-item-name" placeholder="Name"/></th>
            <th><Input type="number" className="input-add-item" id="input-add-item-amount" placeholder="Amount"/></th>
            <th><Input type="text" className="input-add-item" id="input-add-item-remark" placeholder="Remark"/></th>
        </tr>
    );
    let itemsTableBody;
    if(props.currentPlan.items.length > 0){
        itemsTableBody =(
            <>
                <tbody>
                    {props.currentPlan.items.map(itemInfoCB)}
                    {addItemRow}
                </tbody>
            </>
        );
    }
    else{
        itemsTableBody = (
            <>
                <p>No items to pack.</p>;
                <tbody>
                    {addItemRow}
                </tbody>
            </>
        );
    }
    let holidaysTable;
    if(props.currentPlan.holidays.length > 0){
        holidaysTable = (
            <table className="holidays-table-details">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Event</th>
                    </tr>
                </thead>
                <tbody>
                    {props.currentPlan.holidays.map(holidaysInfoCB)}
                </tbody>
            </table>
        );
    }
    else{
        holidaysTable = (
            <p>No public holidays during this period.</p>
        );
    }
    return (
         <div className="detailPage-container">
            
            {/* news information please put here */}
            <div className="news-item">
                <h2>
                    Local News 
                </h2>
                    <table className="news-table-details">
                        <thead>
                            <tr>
                                <th>news</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
            </div>

            <div className="suggestion-container">
                <div className="suggestion-item">
                    <h2 id="msg-details">
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
                    </h2>
                    <table className="suggestion-table-details">
                        <thead>
                                <tr>
                                    <th></th>
                                    {/* <th>Packed</th> */}
                                    <th>Item</th>
                                    {/* <th>Amount</th> */}
                                    <th>Remark</th>
                                    <th>Packed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.currentPlan.items.map(itemInfoCB)}
                                    <th></th>
                                    <th></th>
                                    <th>select all</th>
                                    <th>
                                    <input id="checkbox-check-all" type="checkbox" onClick={chooseAllACB}/>
                                    <label htmlFor="checkbox-check-all" id="checkbox-check-all-label"></label>
                                    </th>
                            </tbody>
                            {/* <tr>
                                    <th></th>
                                    <th></th>
                                    <th>select all</th>
                                    <th>
                                    <input id="checkbox-check-all" type="checkbox" onClick={chooseAllACB}/>
                                    <label htmlFor="checkbox-check-all" id="checkbox-check-all-label"></label>
                                    </th>
                            </tr> */}
                    </table>
                </div>
            <div className="dateEvent-item">
                 <h2>
                    National Holidays 
                </h2>
                    <table className="holidays-table-details">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Event</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.currentPlan.holidays.map(holidaysInfoCB)}
                        </tbody>
                    </table>
            </div>
        </div>
    </div>
    );
}

export default SuggestionView;