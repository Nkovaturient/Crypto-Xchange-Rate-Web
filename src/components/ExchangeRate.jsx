import { Typography, Select, Spin} from "antd";
import { useEffect, useState } from "react";
import {cryptocurrencies, fiatCurrencies } from './currencies/currencies.jsx'
import ExchangeRateUI from '../components/UI/ExchangeRateUI.jsx'
import getExchangeRate from "./fetchData/fetchData.jsx";
import { useQuery } from "react-query";

export default function ExchangeRate() {
    const [fromCurrency, setFromCurrency] = useState(cryptocurrencies[0].value);
    const [ toCurrency, setToCurrency]= useState(fiatCurrencies[0].value);
    const[currencySymbol, setCurrencySymbol]= useState('Bitcoin');

    const handleFromCurrency= (e)=> {
           setFromCurrency(e);
           console.log(`from ${e}`);
    }

    const handleToCurrency= (e)=> {
        setToCurrency(e);
        console.log(`to ${e}`);
 }

 useEffect(()=>{
    const fromCurrencyLabel = cryptocurrencies.find( currency => currency.value === fromCurrency )?.label;
    setCurrencySymbol(fromCurrencyLabel);
 }, [fromCurrency]);

 const dependencies = {
    fromCurrency: fromCurrency,
    toCurrency: toCurrency
 };

 //useQuery to fetch xratedata with paarams- returns an obj 
 //data property is the response object returned from our call to alphavantageapi
 const { data, isLoading, isError, error } = useQuery( {
    queryKey: ['exchangeRate', dependencies], //an array representing a unique identifier for this query
    queryFn: () => getExchangeRate(fromCurrency, toCurrency),
    staleTime: 1000 * 60, //sets the cache to consider data sytale after 1min
    retry: 1, //controls retry attempts
    retryDelay: 6000,

 });
 console.log(data);

    return (
        <section className="exchange-rate">
            <Typography.Title style={{ color: '#4d4add'}} level={2}>
                Exchange Rate
            </Typography.Title>
            <Typography.Text style={{color: '#000', fontWeight: 700, fontSize: '20px'}}>
                Get the latest exchange rate of cryptocurrencies in your favourite currency
            </Typography.Text>
            <section className="select-group" style={{ display: 'flex', marginTop: '1rem', gap: '1rem', justifyContent: 'space-around'}}>
                <Select defaultValue={cryptocurrencies[0].value} options={cryptocurrencies} onChange={handleFromCurrency} />
                <Select defaultValue={fiatCurrencies[0].value} options={fiatCurrencies} onChange={handleToCurrency} />
            </section>
            <section style= {{ marginTop: '1rem', marginLeft: '4rem' }}>
                {
                    isLoading? 
                    ( <Spin tip="Fetching results" spinning size="large" /> )
                    : isError? ( <div> Fetching Error: {error.message}</div> )
                    : ( <div>
                        <ExchangeRateUI 
                        price={data['Realtime Currency Exchange Rate']['5. Exchange Rate']}
                         dataObj={dependencies} 
                         currencySymbol={currencySymbol} />
                    </div>  )
                    }
                    
                
            </section>
        </section>

    );
}