export const urlForFetchs = () => {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:3000`
  }
  return `https://cuddly-bunny-zatt999-cb2b7e0f.koyeb.app`
}
