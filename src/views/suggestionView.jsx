import React, { useEffect, useState } from "react";
import { notification, Popconfirm, Button, Input } from 'antd';
import { PlusOutlined, MinusCircleOutlined, SmileOutlined } from '@ant-design/icons';
import useRerender from "../reactjs/useRerender";
import { thresholdPrecipitation } from '../utils';

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
    const defaultDest = (props.currentPlan) ?  props.currentPlan.destination : "";
    const defaultRange = (props.currentPlan) ? [props.currentPlan.startDate, props.currentPlan.endDate] : ["",""];
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
                            // style={{ background: "#ecd8b2", borderColor: "#ecd8b2" }}
                            size="small"
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
            <tr key={holiday.name}>
                <td>{holiday.date}</td>
                <td>{holiday.name}</td>
            </tr>
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
                    <b>{weather.time}</b>
                    <p className="weather-temp-max">{weather.temp_max}</p>
                    <p className="weather-temp-min">{weather.temp_min}</p>
                    <img src={iconPath} className="weather-icon" alt="weather-icon"></img>
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
                <h3>
                    Local News 
                </h3>
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
                    <h3>
                        Weather Forecasts(°C)
                    </h3>
                    <div className="div-weathers">
                        {props.currentPlan.weathers.map(weatherInfoCB)}
                    </div>
                    <h3>
                        Packing List
                    </h3>
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
            <div className="dateEvent-item">
                <h3>National Holidays</h3>
                {holidaysTable}
            </div>
        </div>
    </div>
    );
}

export default SuggestionView;