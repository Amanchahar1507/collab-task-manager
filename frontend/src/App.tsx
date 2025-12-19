import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"

const path = window.location.pathname

export default function App() {
  const loggedIn = document.cookie.includes("token")

  if (!loggedIn && path === "/signup") return <Signup />
  if (!loggedIn) return <Login />
  if (path === "/profile") return <Profile />
  return <Dashboard />
}
