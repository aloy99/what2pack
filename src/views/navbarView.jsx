import { Link, useMatch, useResolvedPath } from "react-router-dom"
import CustomLinkView from './customlinkView.jsx';
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function NavbarView(props) {

  const navigate = useNavigate();

  function handleuserSignOutACB(e){
    navigate('/')
    props.onUserSignOut();
    // console.log("LOG OUT Nav CLICK")
}  

  return (
    <nav className="nav">
      <Link to="/" className="site-title">What2Pack</Link>
      <ul>
        <CustomLinkView to="/">Home</CustomLinkView>
        
        {/* {props.currentUser ? <CustomLinkView to="/details">Details</CustomLinkView>  : ""} */}
        
        {props.currentUser ? <CustomLinkView to="/profile">All trips</CustomLinkView>  : ""}

        {props.currentUser ? <p className="navUser-button">Signed In as: {props.currentUser.email} </p> : 
         
        <CustomLinkView to="/login">Login / SignUp</CustomLinkView>
        }

        {/* <CustomLinkView to="/login">
        {props.currentUser ? "Signed In as: "+props.currentUser.email : "Login / SignUp"}
        </CustomLinkView>  */}

       {props.currentUser ? <p className="signout-button" onClick={handleuserSignOutACB} >Sign out</p>  : ""}
        
      </ul>
    </nav>
  )
}

// function CustomLink({ to, children, ...props }) {
//   const resolvedPath = useResolvedPath(to)
//   const isActive = useMatch({ path: resolvedPath.pathname, end: true })

//   return (
//     <li className={isActive ? "active" : ""}>
//       <Link to={to} {...props}>
//         {children}
//       </Link>
//     </li>
//   )
// }