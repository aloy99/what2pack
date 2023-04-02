import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function UserIconView(props){
    function passIconClickedACB(){
        props.onIconClicked();
    }
    return (      
    <>
        <div onClick={passIconClickedACB} className="div-profile">
            <Button id="button-profile-start" type="primary" shape="circle" icon={<UserOutlined/>}/>
            <p className="text-center">Login/ Create account</p>
        </div>
    </>
    );
}

export default UserIconView;