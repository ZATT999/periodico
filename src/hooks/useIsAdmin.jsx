import { useEffect, useState } from "react"

export default function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const checkAdmin = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/user/isAdmin", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!isMounted) return

        if (res.status !== 200) {
          setIsAdmin(false)
        } else {
          const data = await res.json()
          setIsAdmin(data?.isAdmin || false)
        }
      } catch (err) {
        console.error("Error checking admin:", err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    checkAdmin()

    return () => {
      isMounted = false
    }
  }, [])

  return { isAdmin, loading }
}
