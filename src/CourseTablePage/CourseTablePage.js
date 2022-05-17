import { useState, useEffect, React } from 'react'
import clsx from 'clsx'

import styles from './styles.module.css'
import PropTypes from 'prop-types'

function CourseTablePage (props) {
  const { listData } = props
  const [inputDollarСurrency, setInputDollarСurrency] = useState(1)

  useEffect(() => {
    if (listData.length > 0) {
      setInputDollarСurrency(listData[0]?.value)
    }
  }, listData)

  const changeFromCurrencyHandler = (e) => {
    setInputDollarСurrency(e.target.value)
  }

  return (
    <div className={styles.courseTablePage}>
      <div className={styles.selectBlock}>
        <span>Курс для 1</span>
        <select onChange={changeFromCurrencyHandler}>
          {listData.map(({ code, value }) => <option key={code} value={value}>{code}</option>)}
        </select>
      </div>
      <table className={styles.table}>
        <tr>
          <th className={clsx(styles.cell, styles.firstColumn, styles.header)}>Валюта</th>
          <th className={clsx(styles.cell, styles.header)}>Курс</th>
        </tr>
        {listData.map(({ value, code }) => (
          <tr key={code}>
            <td className={clsx(styles.cell, styles.firstColumn)}>{code}</td>
            <td className={styles.cell}>{(value / inputDollarСurrency).toFixed(4)}</td>
          </tr>)
        )}
      </table>
    </div>

  )
}

CourseTablePage.propTypes = {
  listData: PropTypes.array
}

export { CourseTablePage }
