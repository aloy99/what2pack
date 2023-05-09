import React, { useState } from "react";
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function AddButtonView(props){
    function clickRemoveFromPlanACB(){
        props.onDeletePlan();
    }
    function clickAddToPlanACB(){
        props.onAddPlan();
    }
    if(props.currentPlanAdded){
        return(
            <Button 
                className="button-add-to-plan-detail"
                // type="primary" 
                // icon={<CheckOutlined />} 
                onClick={clickRemoveFromPlanACB} >
                <img src="inplanbutton.png" alt="Button" />
            </Button>
        );
    }
    else{
        return(
            <Button 
                className="button-add-to-plan-detail"
                // type="default" 
                // icon={<PlusOutlined />} 
                onClick={clickAddToPlanACB} >
                <img src="addbutton.png" alt="Button" />
            </Button>
        );
    }
}

export default AddButtonView;