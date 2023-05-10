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
            <div className="removetoplan-container">
                <Button 
                    className="button-add-to-plan-detail"
                    onClick={clickRemoveFromPlanACB} >
                    <img src="inplanbutton.png" alt="Button"/>
                </Button>
                <div className="removetoplan-title">
                        Remove to plan
                </div>
            </div>
            
        );
    }
    else{
        return(
            <div className="addtoplan-container">
                <Button 
                    className="button-add-to-plan-detail"
                    onClick={clickAddToPlanACB} >
                    <img src="addbutton.png" alt="Button" />
                </Button>
                <div className="addtoplan-title">
                    Add to plan
                </div>
            </div>
        );
    }
}

export default AddButtonView;