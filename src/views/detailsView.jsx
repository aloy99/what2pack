import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useRerender from "../reactjs/useRerender.jsx";
import dayjs from 'dayjs';
import SearchBarView from "./searchBarView";
// import { func } from "prop-types";

function DetailsView(props){
    // const rerenderACB = useRerender();
    // const [defaultDest, setDefaultDest] = useState(props.currentPlan ? props.currentPlan.destination : "") ;
    // const [defaultRange, setDefaultRange] = useState(props.currentPlan ? [dayjs(props.currentPlan.startDate), dayjs(props.currentPlan.endDate)] : ["",""]);
    // useEffect(() => {
    //     setDefaultDest(props.currentPlan ? props.currentPlan.destination : "");
    //     setDefaultRange(props.currentPlan ? [dayjs(props.currentPlan.startDate), dayjs(props.currentPlan.endDate)] : ["",""]);
    // },[window.location.href]);
    function passSearchInputACB(destination, startDate, endDate){
        props.onSearchInput(destination, startDate, endDate);
    }
    function passDestACB(dest){
        props.onDestChanged(dest);
    }
    function passRangeACB(startDate, endDate){
        props.onRangeChanged(startDate, endDate);
    }
    function clickLoginACB(){
        navigate("/login");
    }
    function clickLogoACB(){
        props.onClickLogo();
        navigate("/");
    }
    function setValueACB(args){
        props.setValue.apply(null,arguments)
    }
    function passLocationClickACB(dest_value){
        props.onLocationClick(dest_value)
    }
    return (
    <>
        <div className="logo-login-container">
            <div className="search-detail-item">
                <SearchBarView 
                    id="search-bar-details" 
                    locationSuggestions={props.locationSuggestions}
                    destValue={props.destValue}
                    onLocationClicked={passLocationClickACB}
                    setValue={setValueACB}
                    onSearchInput={passSearchInputACB} 
                    onDestChanged={passDestACB} 
                    onRangeChanged={passRangeACB}
                />
            </div>
        </div>
        <div className="login"></div>
    </>
    );
}

export default DetailsView;