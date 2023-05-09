import { useNavigate } from "react-router-dom";
import { Card } from 'antd';
const { Meta } = Card;
function PlansView(props){
    const navigate = useNavigate();
    function renderPlanCB(plan){
        const description = plan.startDate + " - " + plan.endDate;
        
        function clickCardACB(){
            navigate("/details");
            props.onCurrentPlanChanged(plan);
        }
        return (
            <Card
                className='card-plan-profile'
                key={plan.destination+" "+plan.startDate+" "+plan.endDate}
                hoverable
                cover={<img className='img-card-plan-profile' alt={plan.destination} src={plan.image} />}
                onClick={clickCardACB}
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
            <Card
                className='card-plan-profile'
                key='card-add'
                hoverable
                cover={<img className='img-card-plan-profile' alt="add a plan" src="/public/addPlanPic.jpg" />}
                onClick={clickAddCardACB}
            >
                <Meta title="Add a new plan" description="...." />
            </Card>
            {props.plans.map(plan => renderPlanCB(plan))}
        </div>
    );
}

export default PlansView;