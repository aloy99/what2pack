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
                type="primary" 
                icon={<CheckOutlined />} 
                onClick={clickRemoveFromPlanACB} >
                In my plans
            </Button>
        );
    }
    else{
        return(
            <Button 
                className="button-add-to-plan-detail"
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={clickAddToPlanACB} >
                Add to my plans
            </Button>
        );
    }
}

export default AddButtonView;