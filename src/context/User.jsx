import { useState, useEffect } from "react"
import { UserContext } from "./context"
import { urlForFetchs } from "../utils/urlForFetchs"

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch(`${urlForFetchs()}/api/user/me`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json()

        if (res.status === 401)
          fetch(`${urlForFetchs()}/api/auth/refresh`, {
            method: "POST",
            credentials: "include",
          })
      })
      .then((data) => setUser(data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
