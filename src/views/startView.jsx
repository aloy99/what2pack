import React from "react";
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import SearchBarView from "./searchBarView";

function StartView(props){
    const navigate = useNavigate();
    function handleSearchInput(destination, startDate, endDate){
        console.log("search input: ",destination, startDate, endDate);
        props.model.setCurrentPlan(destination, startDate, endDate);
        navigate("/details");
    }
    function clickLoginACB(){
        navigate("/profile");
    }
    return (
    <>
        <div onClick={clickLoginACB} className="div-profile">
            <Button id="button-profile-start" type="primary" shape="circle" icon={<UserOutlined/>}/>
            <p className="text-center">Login</p>
        </div>
        <h1>What to pack?</h1>
        <h3>Pack the insights into your holidays</h3>
        <SearchBarView id="search-bar-start" onSearchInput={handleSearchInput}/>
    </>);
}   

export default StartView;