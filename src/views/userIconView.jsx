import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function UserIconView(props){
    function passIconClickedACB(){
        props.onIconClicked();
    }
    return (      
    <>
        <div onClick={passIconClickedACB} class="profile-container">
            <div class="login-icon">
            <Button id="button-profile-start" type="default" shape="circle" icon={<UserOutlined/>}/>
            </div>
            <div>
            <p className="text-center">Login/ Create account</p>
            </div>
        </div>
    </>
    );
}

export default UserIconView;