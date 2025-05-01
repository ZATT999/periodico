import { useState, useEffect } from "react"
import { UserContext } from "./context"
import { urlForFetchs } from "../utils/urlForFetchs"

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${urlForFetchs()}/api/user/me`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (res.status === 401) {
          const refresh = await fetch(`${urlForFetchs()}/api/auth/refresh`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          })

          if (refresh.ok) {
            return fetchUser()
          }
          setUser(null)
          setLoading(false)
          return
        }

        if (res.ok) {
          const data = await res.json()
          setUser(data)
          return
        }
        setUser(null)
      } catch (error) {
        console.error("Error fetching user:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}
