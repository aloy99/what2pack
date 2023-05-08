import React, { useEffect, useState } from "react";
import { notification, Popconfirm, Button, Input } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import useRerender from "../reactjs/useRerender";
import { thresholdPrecipitation } from '../utils';
import AddButtonView from './addButtonView';

function SuggestionView(props){
    useEffect(()=>{
        const days = props.currentPlan.weathers.length;
        let weatherWidth = (0.92/(days < 6? days : 6))*100+'%';
        const divsWeather = document.getElementsByClassName("div-weather");
        for(const div of divsWeather){
            div.style.setProperty("--weather-width", weatherWidth);
        }
    });
    const [api, contextHolder] = notification.useNotification();    
    const openNotificationWithIcon = (type, msg, des) => {
        api[type]({
          message: msg,
          description: des,
          duration: 3
        });
    };
    const rerenderACB = useRerender();
    const ifItemConfirmOpen = props.currentPlan.items.map(it => it.ifDeleteConfirmOpen);
    const [openItemConfirm, setOpenItemConfirm] = useState(ifItemConfirmOpen);
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
    const defaultDest = (props.currentPlan) ?  props.currentPlan.destination : "";
    const defaultRange = (props.currentPlan) ? [props.currentPlan.startDate, props.currentPlan.endDate] : ["",""];
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
                openNotificationWithIcon('warning',`${it.name} already exists in current plan.`,'');
                return;
            }
        }
        ifItemConfirmOpen.push(false);
        props.onAddItem(item);
    }
    const [openPlanConfirm, setOpenPlanConfirm] = useState(false);
    const showPlanPopconfirm = () => {
        setOpenPlanConfirm(true);
    };
    const closePlanPopconfirm = () => {
        setOpenPlanConfirm(false);
    };    
    function clickAddToPlanACB(){
        if(!props.currentPlanAdded){
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
        function changeRemarkACB(evt){
            props.onRemarkChange(item, evt.target.value);
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
                            size="medium"
                            shape="circle"
                            icon={<MinusCircleOutlined/>} 
                            onClick={() => clickRemoveFromItemsACB(item)}/>
                    </Popconfirm>
                </td>
                <td>{item.name}</td>
                <td>
                    <input 
                        type="number" 
                        className="input-amount" 
                        defaultValue={item.amount}
                        onChange={changeAmountACB}/>
                </td>
                <td>                    
                    <input  
                        className="input-remark" 
                        defaultValue={item.remark}
                        onChange={changeRemarkACB}/>
                </td>
                <td><input type="checkbox" className="checkbox-suggestion" onChange={itemCheckedACB} value={item.name}/></td>
            </tr>
        )
    }
    function holidaysInfoCB(holiday){
        return(
            // <tr key={holiday.name}>
            //     <td>{holiday.date}</td>
            //     <td>{holiday.name}</td>
            // </tr>
            <div className="holiday-date-name" key={holiday.name}>
                <div className="holiday-title">
                {holiday.date.slice(5)}
                </div>
                <div className="holiday-name">
                {holiday.name}
                </div>
            </div>
        );
    }
    const iconPaths = {
        'SUN' : "public/weather-icon/sun.png",
        'DRIZZLE': "public/weather-icon/drizzle.png",
        'LIGHT': "public/weather-icon/light.png",
        'RAIN': "public/weather-icon/rain.png",
        'CLOUD': "public/weather-icon/cloud.png"
    };
    function weatherInfoCB(weather){
        // console.log(weather)
        // const uv = weather
        let iconPath;
        const pre = weather.precipitation;
        const uv = weather.uv;
        if(pre < thresholdPrecipitation[0]){
            if(uv < 3){
                iconPath = iconPaths['CLOUD'];
            }
            else{
                iconPath = iconPaths['SUN'];
            }
        }
        else if(pre < thresholdPrecipitation[1]){
            iconPath = iconPaths['DRIZZLE'];
        }
        else if(pre < thresholdPrecipitation[2]){
            iconPath = iconPaths['LIGHT'];
        }
        else if(pre < thresholdPrecipitation[3]){
            iconPath = iconPaths['RAIN'];
        }
        else{
            iconPath = iconPaths['RAIN'];
        }
        if(weather.temp_max){
            return (
                <div key={weather.time} className="div-weather">
                        <div className="weather-date">
                        <b>{weather.time}</b>
                        </div>
                        <div className="weather-pic">
                        <img src={iconPath} className="weather-icon" alt="weather-icon"></img>
                        </div>
                        <div className="weather-temp-ranage">
                            <p className="weather-temp-max">{weather.temp_max}</p>
                            <p className="weather-temp-min">{weather.temp_min}</p>
                        </div>
                </div>
            );
        }
        else{
            return (
                <div key={weather.time} className="div-weather">
                    <h3>{weather.time}</h3>
                    <p>Not</p>
                    <p>available</p>
                </div>
            );
        }
    }
    const addItemRow = (
        <tr>
            <th></th>
            <th><Input type="text" className="input-add-item" id="input-add-item-name" placeholder="Name"/></th>
            <th><Input type="number" className="input-add-item" id="input-add-item-amount" placeholder="Amount"/></th>
            <th><Input type="text" className="input-add-item" id="input-add-item-remark" placeholder="Remark"/></th>
            <th>
                <Button 
                    className="button-add-item" 
                    type="primary" icon={<PlusOutlined/>} 
                    onClick={() => clickAddItemACB()}>Add</Button>
            </th>
        </tr>
    );
    let itemsTableBody;
    if(props.currentPlan.items.length > 0){
        itemsTableBody =(
            <>
                <tbody>
                    {props.currentPlan.items.map(itemInfoCB)}
                    {addItemRow}
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>select all</th>
                    </tr>
                    <tr>
                        <th>
                        <input id="checkbox-check-all" type="checkbox" onClick={chooseAllACB}/>
                        <label htmlFor="checkbox-check-all" id="checkbox-check-all-label"></label>
                        </th>
                    </tr>
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
                    <th></th>
                    <th></th>
                    <th>select all</th>
                    <th>
                    <input id="checkbox-check-all" type="checkbox" onClick={chooseAllACB}/>
                    <label htmlFor="checkbox-check-all" id="checkbox-check-all-label"></label>
                    </th>
                </tbody>
            </>
        );
    }
    let holidaysTable;
    if(props.currentPlan.holidays.length > 0){
        holidaysTable = (
            // <table className="holidays-table-details">
            //     <thead>
            //         <tr>
            //             {/* <th>Date</th>
            //             <th>Event</th> */}
            //         </tr>
            //     </thead>
            //     <tbody>
            //         {props.currentPlan.holidays.map(holidaysInfoCB)}
            //     </tbody>
            // </table>
        // <div className="holidaysTable-container">
        //     <p>
        //     {props.currentPlan.holidays.map(holidaysInfoCB)}                 
        //     </p>  
        // </div>
        <div className="holiday-date-name" key={props.currentPlan.holidays[0].name}>
                <div className="holiday-title">
                {props.currentPlan.holidays[0].date.slice(5)}
                </div>
                <div className="holiday-name">
                {props.currentPlan.holidays[0].name}
                </div>
            </div>
        );
    }
    else{
        holidaysTable = (
            <p>No public holidays during this period.</p>
        );
    }
    return (
        <div className="detailPage-container">

            <div className="plan-news-container">
                <div className="planandAdd-item">
                        <div className="plan-inside-item">
                            <div className="plan-title">
                            <h2>{props.destMsg}</h2>
                            <p>{props.dateMsg}</p>
                            </div>
                            <div className="addbutton">
                            {/* {!props.currentPlanAdded && <AddButtonView onAddPlan={props.onAddPlan} />} */}
                            <Popconfirm
                                title="Are you sure to delete this plan?"
                                description=""
                                onConfirm={confirmDeletePlanACB}
                                onCancel={cancelDeletePlanACB}
                                okText="Yes"
                                cancelText="No"
                                disabled={!props.currentPlanAdded}
                                open={openPlanConfirm}
                                >
                                <AddButtonView 
                                    currentPlanAdded={props.currentPlanAdded}
                                    onDeletePlan={clickRemoveFromPlanACB}
                                    onAddPlan={clickAddToPlanACB}/> 
                            </Popconfirm>
                            </div>
                    </div>
                </div>

                <div className="holiday-news-container">
                    {/* news information please put here */}
                    <div className="news holiday">
                        <div className="new-holiday-title">
                        <h3>National Holidays</h3>
                        </div>
                        {holidaysTable}
                    </div>

                    <div className="news one">
                        <h3>news</h3>
                    </div>

                    <div className="news two">
                        <h3>news</h3>
                    </div>

                    <div className="news three">
                        <h3>news</h3>
                    </div>    
                </div>  
            </div>    

        <div className="weather-list-container">

                    <div className="weather-container">
                            <div className="weather-title-item">
                                <h3>
                                    Weather Forecasts(°C)
                                </h3>
                            </div> 
                            <div className="div-weathers">
                                {props.currentPlan.weathers.map(weatherInfoCB)}
                            </div> 
                    </div>

                <div className="suggestion-container">
                        <div className="suggestion-title-item">
                            <h3>
                                Packing List
                            </h3>
                        </div>
                        <div className="suggestion-item">   
                        <table className="suggestion-table-details">
                            <thead>
                                    <tr>
                                        <th></th>
                                        <th>Item</th>
                                        <th>Amount</th>
                                        <th>Remark</th>
                                        <th>Packed</th>
                                    </tr>
                            </thead>
                                {itemsTableBody}
                                {contextHolder}
                        </table>
                        </div>    
                    </div>
            </div>     
    </div>
    );
}

export default SuggestionView;