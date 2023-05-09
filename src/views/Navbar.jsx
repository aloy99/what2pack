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
        <CustomLink to="/start">Home</CustomLink>
        <CustomLink to="/login">
         {currentUser ? "Signed In as: "+currentUser.email : "Login / SignUp"}
          {/* Login/SignUp OR Signed In as: {currentUser?.email} */}
          </CustomLink>
        <CustomLink to="/profile">Profile</CustomLink>
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