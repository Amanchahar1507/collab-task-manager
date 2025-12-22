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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Create Account 🚀
        </h1>

        <p className="text-center text-gray-500 text-sm">
          Join and start collaborating
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded text-sm">
            {error}
          </div>
        )}

        <input
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          onClick={submit}
          className="w-full bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/" className="text-pink-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}
