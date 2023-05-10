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
                {/* <Button 
                    className="button-add-to-plan-detail"
                    onClick={clickRemoveFromPlanACB} >
                    <img src="inplanbutton.png" alt="Button"/>
                </Button> */}
                <img className="button-add-to-plan-detail" src="inplanbutton.png" alt="Button" onClick={clickRemoveFromPlanACB}/>
                <div className="removetoplan-title">
                        See my profile
                </div>
            </div>
            
        );
    }
    else{
        return(
            <div className="addtoplan-container">
                 
                <img className="button-add-to-plan-detail" src="addbutton.png" alt="Button" onClick={clickAddToPlanACB} />
                <div className="addtoplan-title">
                    Add to plan
                </div>
            </div>
        );
    }
}

export default AddButtonView;