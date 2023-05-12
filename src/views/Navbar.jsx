import { Link, useMatch, useResolvedPath } from "react-router-dom"
import CustomLinkView from '../views/customlinkView.jsx';

export default function Navbar() {

  return (
    <nav className="nav">
      <Link to="/" className="site-title">What2Pack</Link>
      <ul>
        <CustomLinkView to="/">Home</CustomLinkView>
        <CustomLinkView to="/details">details</CustomLinkView>  
        <CustomLinkView to="/profile">All trips</CustomLinkView>  
        <CustomLinkView to="/login">Login / SignUp</CustomLinkView> 
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