import { useNavigate } from "react-router-dom";
import { Card } from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
const { Meta } = Card;
function PlansView(props){
    const navigate = useNavigate();
    function renderPlanCB(plan){
        const description = plan.startDate + " - " + plan.endDate;
        
        function clickCardACB(){
            navigate("/details");
            props.onCurrentPlanChanged(plan);
        }
        function clickEditCardACB(){
            clickCardACB();
        }
        function clickDeleteCardACB(){
            console.log("delete card", plan);
            props.onDeletePlan(plan);
        }
        return (
            <Card
                className='card-plan-profile'
                key={plan.destination+" "+plan.startDate+" "+plan.endDate}
                hoverable
                cover={<img className='img-card-plan-profile' alt={plan.destination} src={plan.image} onClick={clickCardACB}/>}
                actions={[
                    <EditOutlined key="edit" onClick={clickEditCardACB}/>,
                    <CloseOutlined key="ellipsis" onClick={clickDeleteCardACB}/>
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
            {props.plans.map(plan => renderPlanCB(plan))}
            <Card
                className='card-plan-profile'
                key='card-add'
                hoverable
                cover={<img className='img-card-plan-profile' alt="add a plan" src="/public/addPlanPic.jpg" />}
                onClick={clickAddCardACB}
            >
            <Meta title="Add a new plan" description="...." />
            </Card>
        </div>
    );
}

export default PlansView;