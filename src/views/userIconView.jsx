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
            <p className="text-center">Login</p>
        </div>
    </>
    );
}

export default UserIconView;