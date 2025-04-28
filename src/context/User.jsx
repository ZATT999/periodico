import { useState, useEffect } from "react"
import { UserContext } from "./context"
import { urlForFetchs } from "../utils/urlForFetchs"

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${urlForFetchs()}/api/user/me`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (response.status === 401) {
          const response = await fetch(`${urlForFetchs()}/api/auth/refresh`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          })

          if (response.ok) {
            fetchUser()
            return
          }
        }

        const data = await response.json()

        if (response.ok) {
          setLoading(false)
          setUser(data)
        }
      } catch (error) {
        console.log(error)
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
