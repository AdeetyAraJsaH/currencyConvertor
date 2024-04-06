import { useEffect, useState } from "react"

function useCurrencyInfo(currency) {
    const [data, setData] = useState({})
    useEffect(() => {
        fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`)
            .then((res) => res.json())
            .then((res) => setData(res["rates"]))
            // getting the json data for all the curreny and its exchange rates with other currencies 
        // console.log(data);
    }, [currency])
    return data
}
export default useCurrencyInfo;