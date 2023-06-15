import { useState } from 'react'
import './App.css'

function App() {
  const [search, setSearch] = useState('')

  const fetchData = async (e) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:5000/pokemon/${search}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const responseData = await response.json()
    console.log(responseData)
    alert(JSON.stringify(responseData))

    if (!response.ok) {
      return console.log('error')
    }
  }

  function onSearchChange(e) {
    setSearch(e.target.value)
  }

  return (
    <div className="App">
      <form onSubmit={fetchData}>
        <input
          type="text"
          value={search}
          onChange={onSearchChange}
          placeholder="Search"
        />
        <button type="submit" name="searchbutton">
          search
        </button>
      </form>
    </div>
  )
}

export default App
