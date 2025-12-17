import { useState } from "react"
import { login } from "../api/auth"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submit = async () => {
    await login({ email, password })
    location.reload()
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="space-y-4">
        <input className="border p-2" placeholder="email" onChange={e=>setEmail(e.target.value)} />
        <input className="border p-2" type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />
        <button className="bg-black text-white p-2 w-full" onClick={submit}>Login</button>
      </div>
    </div>
  )
}
