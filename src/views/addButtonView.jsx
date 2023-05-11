import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function AddButtonView(props){
    const navigate = useNavigate();
    function clickRemoveFromPlanACB(){
        props.onDeletePlan();
    }
    function clickAddToPlanACB(){
        props.onAddPlan();
    }
    function clickSeeMyProfileACB(){
        navigate("/profile");
    }
    if(props.currentPlanAdded){
        return(
            <div className="removetoplan-container">
                <img className="button-add-to-plan-detail" src="inplanbutton.png" alt="Add to Plans" onClick={clickRemoveFromPlanACB}/>
                <u className="removetoplan-title" onClick={clickSeeMyProfileACB}>  
                    See my profile {'>>'}
                </u>
            </div>
            
        );
    }
    else{
        return(
            <div className="addtoplan-container">
                <img className="button-add-to-plan-detail" src="addbutton.png" alt="Remove from Plans" onClick={clickAddToPlanACB} />
                <div className="addtoplan-title">
                    Add to plan
                </div>
            </div>
        );
    }
}

export default AddButtonView;