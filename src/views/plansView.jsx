import { useNavigate } from "react-router-dom";
import useRerender from "../reactjs/useRerender.jsx";
import { Card } from 'antd';
const { Meta } = Card;
function PlansView(props){
    const rerenderACB = useRerender();
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
                key={plan}
                hoverable
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                onClick={clickCardACB}
            >
                <Meta title={plan.destination} description={description} />
            </Card>
        );
    }
    return (
        <div className='plans-profile'>
            {props.plans.map(plan => renderPlanCB(plan))}
        </div>
    );
}

export default PlansView;