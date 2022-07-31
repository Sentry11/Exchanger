import React from 'react'
import { v4 as uuidv4 } from 'uuid';


export default function Exchancher(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount
  } = props
  return (
    <div className='main-container'>
      <input type="number" className="input" value={amount } onChange={onChangeAmount} />
      <select className='select-dropdown' value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map(option => (
          <option key={uuidv4()} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}