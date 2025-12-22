import { useEffect, useState } from "react"
import { getProfile, updateProfile } from "../api/user"

export default function Profile() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")

  useEffect(() => {
    getProfile().then(data => {
      setName(data.name)
      setEmail(data.email)
    })
  }, [])

  const save = async () => {
    setLoading(true)
    setSuccess("")
    await updateProfile(name)
    setLoading(false)
    setSuccess("Profile updated successfully")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-96 p-6 rounded-xl shadow-lg space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          My Profile
        </h1>

        <div>
          <label className="text-sm text-gray-600">Name</label>
          <input
            className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            className="border p-2 w-full rounded-lg bg-gray-100"
            value={email}
            disabled
          />
        </div>

        <button
          onClick={save}
          disabled={loading}
          className="bg-indigo-600 text-white w-full p-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

        {success && (
          <div className="text-green-600 text-sm text-center">
            {success}
          </div>
        )}

        <button
          onClick={() => (window.location.href = "/")}
          className="text-sm text-indigo-600 w-full text-center hover:underline"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  )
}
