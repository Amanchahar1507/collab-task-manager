import { useEffect, useState } from "react"
import { getProfile, updateProfile } from "../api/user"

export default function Profile() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    getProfile().then(data => {
      setName(data.name)
      setEmail(data.email)
    })
  }, [])

  const save = async () => {
    await updateProfile(name)
    alert("Profile updated")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96 space-y-4">
        <h1 className="text-xl font-semibold">My Profile</h1>

        <input
          className="border p-2 w-full"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full bg-gray-100"
          value={email}
          disabled
        />

        <button
          onClick={save}
          className="bg-black text-white w-full p-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}
