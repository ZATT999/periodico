import { NewsProvider } from "./context/news"
import { UserProvider } from "./context/User"

export const Providers = ({ children }) => {
  return (
    <UserProvider>
      <NewsProvider>{children}</NewsProvider>
    </UserProvider>
  )
}
