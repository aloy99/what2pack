import React, { useEffect, useState } from "react";
import { notification, Popconfirm, Button, Input } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, SmileOutlined } from '@ant-design/icons';
import useRerender from "../reactjs/useRerender";
import { thresholdPrecipitation } from '../utils';
import AddButtonView from './addButtonView';
import { SHA1 } from 'crypto-js';

function SuggestionView(props){  

    function generateUniqueId(text) {
        return SHA1(text).toString();
    }
    let isNA = false;
    useEffect(()=>{
        const days = props.currentPlan.weathers.length;
        let weatherWidth = (0.85/(days < 6? days : 6))*100+'%';
        const divsWeather = document.getElementsByClassName("div-weather");
        for(const div of divsWeather){
            div.style.setProperty("--weather-width", weatherWidth);
        }
        let checkedItemNumber = 0;
        for(const item of props.currentPlan.items){
            const id = "checkbox-suggestion-"+ generateUniqueId(item.name);
            const checkbox = document.getElementById(id);
            if(checkbox){
                checkedItemNumber += item.ifPacked;
                checkbox.checked = item.ifPacked;
            }
        }
        if(checkedItemNumber >= props.currentPlan.items.length){
            const checkboxAll = document.getElementById("checkbox-check-all");
            if(checkboxAll){
                checkboxAll.checked = true;
            }
        }
        const msgNA = document.getElementById("remark-na");
        if(msgNA){
            if(isNA){
                msgNA.style.visibility = "visible";
            }
            else{
                msgNA.style.visibility = "hidden";
            }
        }
    },[]);
    
    const [api, contextHolder] = notification.useNotification();    
    const openNotificationWithIconWarning = (type, msg, des) => {
        api[type]({
          message: msg,
          description: des,
          duration: 3
        });
    };
    const openNotificationWithUndoButton = (item, msg, des) => {
        function undoButtonClickedACB(){
            api.destroy();
            props.onUndoDeleteItem(item);
        }
        const btn = (
            <>
              <Button type="link" size="small" onClick={() => api.destroy()}>
                Close
              </Button>
              <Button type="primary" size="small" onClick={() => undoButtonClickedACB()}>
                Undo
              </Button>
            </>
        );
        api.open({
          message: msg,
          description: des,
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
          btn
        });
    };
    const rerenderACB = useRerender();
    console.log(props.currentPlan)
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
    function clickRemoveFromItemsACB(item){
        showItemPopconfirm(item);
    }
    function confirmDeleteItemACB(item){
        console.log("delete",item)
        closeItemPopconfirm(item);
        openNotificationWithUndoButton(item,`${item.name} deleted.`,'')
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
        if(!item.name){
            openNotificationWithIconWarning('warning','Item name should not be empty','');
            return;
        }
        if(!item.amount){
            openNotificationWithIconWarning('warning','Item amount should not be empty','');
            return;
        }
        for(const it of props.currentPlan.items)
        {
            if(it.name === item.name){
                openNotificationWithIconWarning('warning',`${it.name} already exists in current plan.`,'');
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
                <td>
                    {item.name}
                </td>
                <td>
                    <input 
                        type="number" 
                        min="0"
                        className="input-amount" 
                        defaultValue={item.amount}
                        onChange={changeAmountACB}
                    />
                </td>
                <td>                    
                    <input  
                        className="input-remark" 
                        defaultValue={item.remark}
                        onChange={changeRemarkACB}
                    />
                </td>
                <td>
                    <input 
                        className="checkbox-suggestion"
                        id={"checkbox-suggestion-"+ generateUniqueId(item.name)}
                        type="checkbox" 
                        onChange={itemCheckedACB} 
                        value={item.name}
                    />
                </td>
            </tr>
        )
    }
    function newsInfoCB(news){
        return(
            <>
                <div className="content-container">
                    {/* <div className="news-title">
                        <h3>{news.title}</h3>
                    </div> */}
                    <div className="news-title">
                        <p>{news.name}</p>
                    </div>

                </div>
                <div className="hypelink-item">
                    <a href={news.url}  target="_blank">
                        <button className="arrow-button">
                            <span className="arrow-text">More Info</span>   
                            <img className="arrow-icon" src="arrowbutton.png" alt="Button" />
                        </button>
                    </a>
                </div>
            </>
        );
    }
    const iconPaths = {
        'SUN' : "/weather-icon/sun.png",
        'DRIZZLE': "/weather-icon/drizzle.png",
        'LIGHT': "/weather-icon/light.png",
        'RAIN': "/weather-icon/rain.png",
        'CLOUD': "/weather-icon/cloud.png"
    };
    function weatherInfoCB(weather){
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
        if(weather.temp_max !== undefined && weather.temp_max !== 'undefined'){
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
            isNA = true;
            return (
                <div key={weather.time} className="div-weather">
                    <div className="weather-date">
                    <b>{weather.time}</b>
                    </div>
                    <div className="weather-pic">
                        <img src='/unknown.png' className="weather-icon" alt="unknown-icon"></img>
                    </div>
                    <div className="weather-temp-ranage">
                        <p className="weather-temp-max">Not</p>
                        <p className="weather-temp-max">Available*</p>
                    </div>
                </div>
            );
        }
    }
    const addItemRow = (
        <tr>
            <th>
            <Button 
                className="button-add-item" 
                type="defalt" 
                size="medium"
                icon={<PlusCircleOutlined/>} 
                onClick={() => clickAddItemACB()}></Button>
            </th>
            <th><Input type="text" className="input-add-item" id="input-add-item-name"/></th>
            <th><Input type="number" min="0" className="input-add-item" id="input-add-item-amount" /></th>
            <th><Input type="text" className="input-add-item" id="input-add-item-remark" /></th>
            <th></th>
        </tr>
    );
    const itemsTableBody = (
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
            <tbody>
                {props.currentPlan.items.length > 0? props.currentPlan.items.map(itemInfoCB):null}
                {addItemRow}
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>select all</th>
                    <th>
                    <input className="checkbox-all" id="checkbox-check-all" type="checkbox" onClick={chooseAllACB}/>
                    <label htmlFor="checkbox-check-all" id="checkbox-check-all-label"></label>
                    </th>
                </tr>
            </tbody>
            {contextHolder}
        </table>
    );
    let holidaysTable;
    if(props.currentPlan.holidays && props.currentPlan.holidays.length > 0){
        holidaysTable = (
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
            <p className="nohoilday-item">No public holidays during this period.</p>
        );
    }
    return (
        <div className="detailPageOutside-container">
            <div className="detailPage-container">
                <div className="plan-news-container">
                <div className="planandAdd-item">
                    <div className="plan-inside-item">
                        <div className="plan-title">
                            <div className="plan-title-name">
                            {props.destMsg}
                            </div>
                            <div className="plan-title-date">
                            {props.dateMsg}
                            </div>
                        </div>
                        <div className="addbutton">
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
                                user={props.user}
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
                       {props.currentPlan.news[0]?newsInfoCB(props.currentPlan.news[0]):{}}
                    </div> 

                    <div className="news two">
                       {props.currentPlan.news[1]?newsInfoCB(props.currentPlan.news[1]):{}}
                        {/* {newsInfoCB(props.currentPlan.news[1])} */}
                    </div>

                    <div className="news three">
                       {props.currentPlan.news[2]?newsInfoCB(props.currentPlan.news[2]):{}}
                        {/* {newsInfoCB(props.currentPlan.news[2])} */}
                    </div>     
                </div>  
            </div>    

        <div className="weather-list-container">

            <div className="weather-container">
                <div className="weather-title-item">
                    <h3 className="weather-title">Weather Forecasts(°C)</h3>
                    <p className="div-weathers-warm" id="remark-na">* We only provide 14 days weather forecast.</p>
                </div> 
                <div className="div-weathers-container">
                    <div className="div-weathers">
                        {props.currentPlan.weathers.map(weatherInfoCB)}
                    </div> 
                </div>
            </div>

            <div className="suggestion-container">
                    <div className="suggestion-title-item">
                        <h3>
                            Packing List
                        </h3>
                    </div>
                    <div className="suggestion-item">   
                    {props.currentPlan.items.length > 0?itemsTableBody: <p>No items.</p>}
                    </div>    
                </div>
            </div>     
        </div>
    </div>
    );
}

export default SuggestionView;