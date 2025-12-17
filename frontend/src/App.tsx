import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"

export default function App() {
  const loggedIn = document.cookie.includes("token")
  return loggedIn ? <Dashboard /> : <Login />
}
