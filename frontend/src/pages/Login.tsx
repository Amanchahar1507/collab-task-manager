import { useState } from "react"
import { login } from "../api/auth"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setError("")
    setLoading(true)
    try {
      await login({ email, password })
      window.location.href = "/"
    } catch {
      setError("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg space-y-4">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Welcome Back
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded text-sm">
            {error}
          </div>
        )}

        <input
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          onClick={submit}
          className="bg-indigo-600 text-white w-full p-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
