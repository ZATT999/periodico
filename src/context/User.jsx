import { useState, useEffect } from "react"
import { UserContext } from "./context"

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch("http://localhost:3000/api/user/me", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json()

        if (res.status === 401)
          fetch("http://localhost:3000/api/auth/refresh", {
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
