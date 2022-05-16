import { useState, useEffect, React } from 'react'
import clsx from 'clsx'

import styles from './styles.module.css'
import PropTypes from 'prop-types'

function CourseTablePage (props) {
  const { listData = [] } = props
  const [k, setK] = useState(listData[0]?.value)

  useEffect(() => {
    if (listData) {
      setK(listData[0]?.value)
    }
  }, listData)

  const changeFromCurrenceHandler = (e) => {
    setK(e.target.value)
  }

  return (
    <div className={styles.courseTablePage}>
      <div className={styles.selectBlock}>
        <span>Курс для</span>
        <select onChange={changeFromCurrenceHandler}>
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
          <td className={styles.cell}>{(value / k).toFixed(4)}</td>
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
