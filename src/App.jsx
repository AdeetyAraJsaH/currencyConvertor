import { useState } from 'react'
import swapLogo from './assets/swap.svg'
import Input from './components/Input'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import './App.css'


function App() {

  const [from, setFrom] = useState("USD") // state of currency type
  const [to, setTo] = useState("INR")
  const [amount, setAmount] = useState() //state of input in from state
  const [convertedAmount, setConvertedAmount] = useState()
  const [spin, setSpin] = useState(false); // state of spin in swap button

  const currencyInfo = useCurrencyInfo(from) // it is getting the currencies info 

  const options = Object.keys(currencyInfo) // for getting all the options of currencies

  const swap = () => { // set the states after swap
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount);
    (function () {
      setSpin(true);
      // Remove the animation class after it completes
      setTimeout(() => setSpin(false), 250);
    })();
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert()

            }}
          >
            <div className="w-full mb-1">
              <Input
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                style={{
                  borderRadius: "50%",
                  padding: "7px 7px",
                  backgroundColor: "#50515b"
                }}
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md text-white px-2 py-0.5"
                onClick={swap}
              >
                <img src={swapLogo}
                  className={spin ? 'spin-animation' : ''}
                  alt="Swap" />
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <Input
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button
              style={{ backgroundColor: "#50515b" }}
              type="submit"
              className="w-full text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App