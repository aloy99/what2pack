import React from "react";
import dayjs from 'dayjs';
import { notification, DatePicker, Button} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import SearchCompleteView from './searchCompleteView';
const { RangePicker } = DatePicker;

function SearchBarView(props){
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, msg, des) => {
        api[type]({
          message: msg,
          description: des,
          duration: 3
        });
    };
    function clickSearchACB(evt){
        let destination = document.querySelector(".input-destination").value;
        let rangePickers = document.querySelectorAll(".ant-picker-input");
        let startDate = rangePickers[0].children[0].value;
        let endDate = rangePickers[1].children[0].value;
        if(destination === null || destination === ""){
            openNotificationWithIcon('warning','Please select a destination.','');
        }
        else if(startDate === null || startDate === ""){
            openNotificationWithIcon('warning','Please select a start date.','');
        }
        else if(endDate === null || endDate === ""){
            openNotificationWithIcon('warning','Please select an end date.','');
        }
        else{
            props.onSearchInput(destination, startDate, endDate);
        }
    }
    function destChangeACB(){
        let destination = document.querySelector(".input-destination").value;
        console.log(destination);
        props.onDestChanged(destination);
    }
    function rangeChangeACB(range){
        if(range === null){
            props.onRangeChanged("", "");
            return;
        }
        const startDate = range[0].format('YYYY-MM-DD');
        const endDate = range[1].format('YYYY-MM-DD');
        props.onRangeChanged(startDate, endDate);
    }
    function locationClickedACB(dest){
        props.onDestChanged(dest);
    }
    function mapsLoadedACB(){
        props.onMapsLoad();
    }
    const disabledDate = (current) => {
        // Can not select days before today
        return current < dayjs().startOf('day');
    };
    return (
    <div className="search-bar-container">
            <div>
                <SearchCompleteView defaultValue={props.defaultDest} gmapsLoaded = {props.gmapsLoaded} onMapsLoad={mapsLoadedACB} onChange={destChangeACB} onLocationClicked={locationClickedACB}/>
            </div>
            <div>
                <RangePicker id="range-picker-search-bar" defaultValue={props.defaultRange} disabledDate={disabledDate} onChange={rangeChangeACB}/>
            </div>
        <div className="search-item">

        {contextHolder}
      
        <Button id="button-search-bar" type="primary" icon={<SearchOutlined />}  style={{ background: "#FA4C37" }} onClick={clickSearchACB}>
            Pack!
        </Button>
        </div>
    </div>
    );
}

export default SearchBarView;
