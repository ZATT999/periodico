import { useEffect, useState } from "react"

export default function UseIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    fetch("http://localhost:3000/api/user/isAdmin", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setIsAdmin(data.isAdmin))
      .catch((err) => console.log(err))
  }, [])

  return isAdmin
}
