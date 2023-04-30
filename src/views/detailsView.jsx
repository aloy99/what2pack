import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popconfirm } from 'antd';
import dayjs from 'dayjs';
import SearchBarView from "./searchBarView";
import AddButtonView from './addButtonView';
import UserIconView from './userIconView';
import { func } from "prop-types";

function DetailsView(props){
    const defaultDest = props.currentPlan ? props.currentPlan.destination : "";
    const defaultRange = props.currentPlan ? [props.currentPlan.startDate, props.currentPlan.endDate] : ["",""];
    const navigate = useNavigate();
    const currentPlanAdded = props.currentPlanAdded;
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
            <h2 id="msg-details">{props.planMsg}</h2>
            <div className="search-detail-item">
                <SearchBarView 
                    id="search-bar-details" 
                    defaultDest={defaultDest}
                    defaultRange={defaultRange}
                    gmapsLoaded = {props.gmapsLoaded}
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
                    disabled={!currentPlanAdded}
                    open={openPlanConfirm}
                    >
                    <AddButtonView 
                        currentPlanAdded={currentPlanAdded}
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