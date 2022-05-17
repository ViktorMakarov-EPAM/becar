import { useState, useEffect, useCallback, React } from 'react'
import { Route, Routes, Link } from 'react-router-dom'

import { ConverterPage } from './ConverterPage'
import { CourseTablePage } from './CourseTablePage'
import styles from './styles.module.css'
import './index.css'

function App () {
  const [listData, setListData] = useState([])

  const getData = useCallback(async () => {
    const response = await fetch('https://api.currencyapi.com/v3/latest?apikey=REeeB8j0LkOJwD9zVzeRbo9RRwfLoEQFCA3GOPvD')
    const { data } = await response.json()
    const result = Object.values(data).slice(0, 10)
    setListData(result)
  }, [])

  console.log(listData)

  useEffect(() => { getData() }, [getData])

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Конвертер валют</h1>
        <nav className={styles.navigation}>
          <Link to="/">Конвертер</Link>
          <Link to="/table">Таблица</Link>
        </nav>
      </header>
      <main className={styles.main}>
      <Routes>
        <Route path="/" element={<ConverterPage listData={listData} />} />
        <Route path="/table" element={<CourseTablePage listData={listData} />} />
      </Routes>
      </main>
     </div>
  )
}

export default App
