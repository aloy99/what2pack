import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { notification, Popconfirm, Card, Button } from 'antd';
import { EditOutlined, CloseOutlined, SmileOutlined  } from '@ant-design/icons';

import useRerender from "../reactjs/useRerender";

const { Meta } = Card;
function PlansView(props){
    const rerenderACB = useRerender();
    const navigate = useNavigate();
    const ifPlanConfirmOpen = props.plans.map(() => false);
    const [openPlanConfirm, setOpenPlanConfirm] = useState(ifPlanConfirmOpen); 
    const [api, contextHolder] = notification.useNotification();    
    const openNotificationWithUndoButton = (plan, msg, des) => {
        function undoButtonClickedACB(){
            api.destroy();
            openPlanConfirm[plan.index] = false;
            props.onUndoDeletePlan(plan);
        }
        const btn = (
            <>
              <Button type="link" size="small" onClick={() => api.destroy()}>
                Close
              </Button>
              <Button type="primary" size="small" onClick={() => undoButtonClickedACB()}>
                Undo
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
    function renderPlanCB(plan){
        const description = plan.startDate + " ~ " + plan.endDate;
        function clickCardACB(){
            navigate("/details");
            props.onCurrentPlanChanged(plan);
        }
        function clickEditCardACB(){
            clickCardACB();
        }
        function clickDeleteCardACB(){
            showPlanPopconfirm(plan);
        }
        function showPlanPopconfirm(plan){
            const openPlanConfirmNew = openPlanConfirm;
            openPlanConfirmNew[plan.index] = true;
            setOpenPlanConfirm(openPlanConfirmNew);
            rerenderACB();
        }
        function closeItemPopconfirm(plan){
            const openPlanConfirmNew = openPlanConfirm;
            openPlanConfirmNew[plan.index] = false;
            setOpenPlanConfirm(openPlanConfirmNew);
            rerenderACB();
        };
        function confirmDeletePlanACB(){
            console.log("delete card", plan);
            openNotificationWithUndoButton(plan,`Trip to ${plan.destination}(${plan.startDate}~${plan.endDate}) deleted.`,'')
            props.onDeletePlan(plan);
        }
        function cancelDeletePlanACB(){
            closeItemPopconfirm(plan);
        }
        return (
            <Card
                className='card-plan-profile'
                key={plan.destination+" "+plan.startDate+" "+plan.endDate}
                hoverable
                cover={<img className='img-card-plan-profile' alt={plan.destination} src={plan.image} onClick={clickCardACB}/>}
                actions={[
                    <EditOutlined key="edit" onClick={clickEditCardACB}/>,
                    <Popconfirm
                        title="Are you sure to delete this plan?"
                        description=""
                        onConfirm={confirmDeletePlanACB}
                        onCancel={cancelDeletePlanACB}
                        okText="Yes"
                        cancelText="No"
                        // disabled={!props.currentPlanAdded}
                        open={openPlanConfirm[plan.index]}
                        >
                        <CloseOutlined key="ellipsis" onClick={clickDeleteCardACB}/>
                    </Popconfirm>
                ]}
            >
                <Meta title={plan.destination} description={description} />
            </Card>
        );
    }
    function clickAddCardACB(){
        navigate("/");
    }
    return (
        <div className='plans-profile'>
            {contextHolder}
            {props.plans.map(plan => renderPlanCB(plan))}
            <Card
                className='card-plan-profile'
                key='card-add'
                hoverable
                cover={<img className='img-card-plan-profile' alt="add a plan" src="/public/addPlanPic.png" />}
                onClick={clickAddCardACB}
            >
                <Meta title="Add a new plan" description="...." />
            </Card>
        </div>
    );
}

export default PlansView;