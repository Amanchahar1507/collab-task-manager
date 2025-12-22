import { useState } from "react"
import { register } from "../api/auth"
import axios from "axios"

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setError("")
    setLoading(true)

    try {
      await register({ name, email, password })
      window.location.href = "/"
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setError("User already exists")
        } else {
          setError("Server unavailable. Please try again.")
        }
      } else {
        setError("Something went wrong")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg space-y-4">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Create Account
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded text-sm">
            {error}
          </div>
        )}

        <input
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          onClick={submit}
          className="bg-pink-600 text-white w-full p-2 rounded hover:bg-pink-700 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/" className="text-pink-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}
