import styles from './styles.module.css'
import { useState, useMemo, React, useEffect } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

function ConverterPage (props) {
  const { listData } = props
  const [inputCurrency, setInputCurrency] = useState('0')
  const [inputDollarСurrency, setInputDollarСurrency] = useState(1)
  const [outputDollarСurrency, setOutputDollarСurrency] = useState(1)
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    if (listData.length > 0) {
      setInputDollarСurrency(listData[0]?.value)
      setOutputDollarСurrency(listData[0]?.value)
    }
  }, listData)

  const inputHandler = (e) => {
    const input = e.target.value === '0' ? '0' : e.target.value.replace(/^0/i, '')
    setInputCurrency(input)
    const regexp = /^\d+[,.]?\d*$/
    setIsValid(input === '' || regexp.test(input))
  }

  const changeFromCurrenceHandler = (e) => {
    setOutputDollarСurrency(e.target.value)
  }

  const changeToCurrenceHandler = (e) => {
    setInputDollarСurrency(e.target.value)
  }

  const result = useMemo(() => {
    if (!isValid) return ''
    const stringWithoutComma = (inputCurrency.replace(/,/, '.'))
    return parseFloat((stringWithoutComma * inputDollarСurrency / outputDollarСurrency).toFixed(4))
  }, [inputDollarСurrency, outputDollarСurrency, inputCurrency, isValid])

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
