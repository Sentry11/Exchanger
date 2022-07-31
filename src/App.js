import React, { useEffect, useState } from 'react';

import Exchancher from './exchange-block';
import Header from './header';
import arrows from '../src/image/transfer.png'



let myHeaders = new Headers();
myHeaders.append("apikey", "ZHkXS4xEUFtJhsJifSwQRKCl9OTABAZX");

let requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};


function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  const [usdToShow, setUsdToShow] = useState()
  const [eurToShow, setEurToShow] = useState()



  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }




  useEffect(() => {
    fetch("https://api.apilayer.com/fixer/latest?symbols=EUR%2CUSD%2CUAH%2CPLN%2CGBR&base=UAH", requestOptions)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })

      // This fetch is optional, but if there are no restrictions on requests, it will be easier
    fetch("https://api.apilayer.com/fixer/latest?symbols=UAH&base=USD", requestOptions)
      .then(res => res.json())
      .then(data => {
        setUsdToShow(data.rates)
      })
      // This fetch is optional, but if there are no restrictions on requests, it will be easier
    fetch("https://api.apilayer.com/fixer/latest?symbols=UAH&base=EUR", requestOptions)
    .then(res => res.json())
    .then(data => {
      setEurToShow(data.rates)
    })
    // If it is necessary to limit requests, we can get the data from the first request. 
    // Since the uah base is there, then on its basis, by mathematical transformations,
    // you can get both the dollar and the euro
    }, [])

    


  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`https://api.apilayer.com/fixer/latest?symbols=${toCurrency}&base=${fromCurrency}`, requestOptions)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])


  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }




  return (
    <>

      {/* {console.log(currencyToShow)} */}
      <Header usdToShow = {usdToShow} eurToShow = {eurToShow}/>
    
      <div className='main'>
      <h1 className='main-header'>Convert</h1>
      <div className="convert">
      <Exchancher
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <img className = "arrows" src ={arrows} alt = 'arrows'></img>
      <Exchancher
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
      </div>
    </div>

    </>
  );
}

export default App;
