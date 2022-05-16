import styles from './styles.module.css'
import { useState, useMemo, React, useEffect } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

function ConverterPage (props) {
  const { listData = [] } = props
  const [inputCurrency, setInputCurrency] = useState('0')
  const [k, setK] = useState(1)
  const [i, setI] = useState(1)
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    if (listData) {
      setK(listData[0]?.value)
      setI(listData[0]?.value)
    }
  }, listData)

  const inputHandler = (e) => {
    const input = e.target.value === '0' ? '0' : e.target.value.replace(/^0/i, '')
    setInputCurrency(input)
    const regexp = /^\d+[,.]?\d*$/
    setIsValid(input === '' || regexp.test(input))
  }

  const changeFromCurrenceHandler = (e) => {
    setI(e.target.value)
  }

  const changeToCurrenceHandler = (e) => {
    setK(e.target.value)
  }

  const result = useMemo(() => {
    if (!isValid) return ''
    const stringWithoutComma = (inputCurrency.replace(/,/, '.'))
    return parseFloat((stringWithoutComma * k / i).toFixed(4))
  }, [k, i, inputCurrency, isValid])

  return (
      <div className={styles.converter}>
        <div className={styles.data}>
          <input className={clsx(!isValid && styles.invalid, styles.input)} value={inputCurrency} onChange={inputHandler} type='text'></input>
          <select onChange={changeFromCurrenceHandler}>
            {listData.map(({ code, value }) => <option key={code} value={value}>{code}</option>)}
          </select>
        </div>
        <span>{'\u21E9'}</span>
        <div className={styles.data}>
          <div className={styles.input}><span className={styles.result}>{result}</span></div>
          <select onChange={changeToCurrenceHandler}>
            {listData.map(({ code, value }) => <option key={code} value={value}>{code}</option>)}
          </select>
        </div>
        {!isValid && <span className={styles.validMassage}>Допускаются только цифры, запятая и точка</span>}
      </div>
  )
}

ConverterPage.propTypes = {
  listData: PropTypes.array
}

export { ConverterPage }
