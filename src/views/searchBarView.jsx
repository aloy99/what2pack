import React from "react";
import dayjs from 'dayjs';
import { Input, DatePicker, Button} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import SearchCompleteView from './searchCompleteView';
const { RangePicker } = DatePicker;

function SearchBarView(props){
    function clickSearchACB(evt){
        let destination = document.querySelector(".input-destination").value;
        let rangePickers = document.querySelectorAll(".ant-picker-input");
        let startDate = rangePickers[0].children[0].value;
        let endDate = rangePickers[1].children[0].value;
        if(destination == null || destination == "")
            alert("Please enter a destination.");
        else if(startDate == null || startDate == "")
            alert("Please select a start date.");
        else if(endDate == null || endDate == "")
            alert("Please select an end date.");
        else
            props.onSearchInput(destination, startDate, endDate);
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

    const disabledDate = (current) => {
        // Can not select days before today
        return current < dayjs().startOf('day');
    };
    return (
    <div>
        <SearchCompleteView onChange={destChangeACB} onLocationClicked={locationClickedACB} defaultDest={props.defaultDest}/>
        <RangePicker id="range-picker-search-bar" defaultValue={props.defaultRange} disabledDate={disabledDate} onChange={rangeChangeACB}/>
        <Button id="button-search-bar" type="primary" icon={<SearchOutlined />} onClick={clickSearchACB}>
            Search
        </Button>
    </div>
    );
}

export default SearchBarView;
