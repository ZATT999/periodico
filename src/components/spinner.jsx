export default function Spinner({ text = "" }) {
  return (
    <>
      <main className="flex flex-col items-center justify-center w-full h-screen">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <h4 className="mt-4 text-blue-600 text-lg font-medium">{text}</h4>
          </div>
        </div>
      </main>
    </>
  )
}
