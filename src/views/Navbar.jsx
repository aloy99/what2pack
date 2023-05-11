import { Link, useMatch, useResolvedPath } from "react-router-dom"
import {useAuth} from "../reactjs/firebase-auth-hook.jsx";

export default function Navbar() {
  const currentUser = useAuth();

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        What2Pack
      </Link>
      <ul>
        <CustomLink to="/">Home</CustomLink>
        {/* show trips if logged in */}
        {currentUser ? <CustomLink to="/profile">All trips</CustomLink>  : ""}
        <CustomLink to="/login">
        {currentUser ? "Signed In as: "+currentUser.email : "Login / SignUp"}
       </CustomLink> 
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}