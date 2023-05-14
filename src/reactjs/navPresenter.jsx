import React from "react";
import Navbar from "../views/navbarView.jsx";
import useModelProp from './useModelProp.jsx';
import { signOut2 } from "../firebaseModel.js";
import useRerender from "./useRerender.jsx";


function NavPresenter(props){
    useModelProp(props.model, ["user"]); 
    const rerenderACB = useRerender();

 

    const handleUserSignOutACB = async () => {
        await signOut2();
        rerenderACB();
        console.log("sign out Presenter NAv successful");
      };

      
    return (
        <div className="App">
                <Navbar 
                currentUser={props.model.user}
                onUserSignOut={handleUserSignOutACB}
                />
        </div>
    );
}

export default NavPresenter;