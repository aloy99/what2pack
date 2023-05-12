import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button,notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

function AddButtonView(props){
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();    
    const openNotificationNeedLogIn = (msg, des) => {
        function loginButtonClickedACB(){
            navigate('/login');
            api.destroy();
        }
        const btn = (
            <>
              <Button type="link" size="small" onClick={() => api.destroy()}>
                Cancel
              </Button>
              <Button type="primary" size="small" onClick={() => loginButtonClickedACB()}>
                Login/SignUp
              </Button>
            </>
        );
        api.open({
          message: msg,
          description: des,
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
          btn
        });
    };
    function clickRemoveFromPlanACB(){
        props.onDeletePlan();
    }
    function clickAddToPlanACB(){
        if(props.user){
            props.onAddPlan();
        }
        else{
            openNotificationNeedLogIn("need log in","");
        }
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
                {contextHolder}
            </div>
        );
    }
}

export default AddButtonView;