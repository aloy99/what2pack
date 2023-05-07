import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popconfirm } from 'antd';
import dayjs from 'dayjs';
import SearchBarView from "./searchBarView";
import AddButtonView from './addButtonView';
import UserIconView from './userIconView';
import { func } from "prop-types";

function DetailsView(props){
    const [defaultDest, setDefaultDest] = useState(props.currentPlan ? props.currentPlan.destination : "") ;
    const [defaultRange, setDefaultRange] = useState(props.currentPlan ? [dayjs(props.currentPlan.startDate), dayjs(props.currentPlan.endDate)] : ["",""]);
    useEffect(() => {
        console.log(props.currentPlan);
        setDefaultDest(props.currentPlan ? props.currentPlan.destination : "");
        setDefaultRange(props.currentPlan ? [dayjs(props.currentPlan.startDate), dayjs(props.currentPlan.endDate)] : ["",""]);
    },[window.location.href]);
    const navigate = useNavigate();
    const [openPlanConfirm, setOpenPlanConfirm] = useState(false);
    const showPlanPopconfirm = () => {
        setOpenPlanConfirm(true);
    };
    const closePlanPopconfirm = () => {
        setOpenPlanConfirm(false);
    };    
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
    function mapsLoadedACB(){
        props.onMapsLoad();
    }
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
        //TODO: Undo button.
    }
    function cancelDeletePlanACB(){
        closePlanPopconfirm();
    }
    return (
    <>
        <div className="logo-login-container">
            {/* <div className="logo-item">
            <img 
                src="\logov1.png" 
                alt="What2Pack" 
                width="100" 
                height="100"
                onClick={clickLogoACB}>
            </img>
            </div> */}
            {/* <h2 id="msg-details">{props.planMsg}</h2> */}
            <div className="search-detail-item">
                <SearchBarView 
                    id="search-bar-details" 
                    defaultDest={defaultDest}
                    defaultRange={defaultRange}
                    gmapsLoaded={props.gmapsLoaded}
                    onMapsLoad={mapsLoadedACB}
                    onSearchInput={passSearchInputACB} 
                    onDestChanged={passDestACB} 
                    onRangeChanged={passRangeACB}
                />
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

            {/* <div className="login-item">
            <UserIconView onIconClicked={clickLoginACB}/>
            </div> */}
            
        </div>
        <div className="login"></div>
    </>
    );
}

export default DetailsView;