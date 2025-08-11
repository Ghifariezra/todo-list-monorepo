import { useState, useCallback } from 'react'

function App() {
  const [open, setOpen] = useState(false)
  const [check, setCheck] = useState({
    name: '',
    email: '',
    password: '',
  })

  const checkData = useCallback( async () => {
    const response = await fetch('/api/check', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    setCheck(data)
    setOpen(!open)
  }, [setCheck, setOpen, open])

  return (
    <>
    <button onClick={checkData}>
      Check
    </button>

    <pre>
      {
        open ? (
          <div>
            <p>{check.name}</p>
            <p>{check.email}</p>
            <p>{check.password}</p>
          </div>
        ) : (
          <p>Click check to see data</p>
        )
      }
    </pre>
    </>
  )
}

export default App
