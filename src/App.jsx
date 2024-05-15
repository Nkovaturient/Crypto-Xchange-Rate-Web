import './App.css'
import ExchangeRate from './components/ExchangeRate'
import { QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient ( {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, //disable automatic refetching on focus
      refetchInterval: 60000, //refetch queries every 60 sec
    }
  }
})

function App() {
  
  return (
    <>
    <div>
     <QueryClientProvider client={queryClient}>
     <ExchangeRate/>
     </QueryClientProvider>
      </div>
    </>
  )
}

export default App
