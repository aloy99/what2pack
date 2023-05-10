import React, { useEffect, useState } from "react";
import { notification, Popconfirm, Button, Input } from 'antd';
import { PlusOutlined, MinusCircleOutlined, SmileOutlined } from '@ant-design/icons';
import useRerender from "../reactjs/useRerender";
import { thresholdPrecipitation } from '../utils';
import AddButtonView from './addButtonView';

function SuggestionView(props){
    useEffect(()=>{
        const days = props.currentPlan.weathers.length;
        let weatherWidth = (0.8/(days < 6? days : 6))*100+'%';
        const divsWeather = document.getElementsByClassName("div-weather");
        for(const div of divsWeather){
            div.style.setProperty("--weather-width", weatherWidth);
        }
        for(const item in props.currentPlan.items){
            const checkbox = document.getElementById("checkbox-suggestion-"+ item.name);
            if(checkbox){
                checkbox.checked = item.ifPacked;
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
            console.log("undo");
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
        if(item.name == ""){
            openNotificationWithIconWarning('warning','Item name should not be empty','');
            return;
        }
        if(!item.amount){
            openNotificationWithIconWarning('warning','Item amount should not be empty','');
            return;
        }
        for(const it of props.currentPlan.items)
        {
            if(it.name == item.name){
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
                <td>{item.name}</td>
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
                        id={"checkbox-suggestion-"+ item.name}
                        type="checkbox" 
                        // size="medium"
                        // shape="circle"
                        onChange={itemCheckedACB} 
                        value={item.name}
                        // checked={item.ifPacked}
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
                        <h3>{news.}</h3>
                    </div> */}
                    <p>{news.name}</p>
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
                       {newsInfoCB(props.currentPlan.news[0])}
                    </div> 

                    <div className="news two">
                        {newsInfoCB(props.currentPlan.news[1])}
                    </div>

                    <div className="news three">
                        {newsInfoCB(props.currentPlan.news[2])}
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