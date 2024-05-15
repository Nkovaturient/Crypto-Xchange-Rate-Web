import axios from 'axios';

export default function getExchangeRate(fromCurrency, toCurrency){

    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {
            from_currency: fromCurrency,
            function: 'CURRENCY_EXCHANGE_RATE',
            to_currency: toCurrency
        },
        headers: {
            'X-RapidAPI-Key' : 'b6c6590f4fmsh1128c8c5f71d786p1e364cjsna8389274bc4a',
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
        }
    };

    return axios.request(options)
    .then((res)=> { return res.data})
    .catch((err) => { return err.message; })

}