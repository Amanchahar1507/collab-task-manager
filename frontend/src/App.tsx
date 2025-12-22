import { useEffect, useState } from "react"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import { getProfile } from "./api/user"

export default function App() {
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)

  const path = window.location.pathname

  useEffect(() => {
    getProfile()
      .then(() => setLoggedIn(true))
      .catch(() => setLoggedIn(false))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600 animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!loggedIn && path === "/signup") return <Signup />
  if (!loggedIn) return <Login />
  if (path === "/profile") return <Profile />
  return <Dashboard />
}
