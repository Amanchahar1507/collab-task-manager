import { useState } from "react"
import { register } from "../api/auth"

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submit = async () => {
    await register({ name, email, password })
    window.location.href = "/"
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded shadow w-80 space-y-4">
        <h1 className="text-xl font-semibold">Sign Up</h1>

        <input
          className="border p-2 w-full"
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="bg-black text-white w-full p-2"
        >
          Create Account
        </button>
      </div>
    </div>
  )
}
