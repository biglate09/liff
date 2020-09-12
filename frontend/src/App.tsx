import React , {Fragment} from 'react';
import { ApolloClient,ApolloProvider, createHttpLink, InMemoryCache, gql } from '@apollo/client'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom'

import Routing from './components/routing/Routes';
import './styles/tailwind.css';
import 'antd/dist/antd.css';

// import {
//   useQuery,
//   useApolloClient,
//   useSubscription,
//   useLazyQuery,
//   useMutation,
// } from '@apollo/react-hooks'

const link = createHttpLink({
  uri: 'https://eb691da078a3.ngrok.io/graphql',
  // uri: 'http://localhost:112/graphql',
});
const cache = new InMemoryCache();
const outerClient = new ApolloClient({
  cache: cache,
  link: link,
})



const Inner = ()=>{
  // const {data,loading} = useQuery(gql`
  // {users{
  //   id
  // }}`)
  // return <div>{JSON.stringify(data)}</div>
  return <>
    <Router>
    <Fragment>
      <Switch>
        <Route component={Routing} />
      </Switch>
    </Fragment>
    </Router>
  </>
}

const App = () => {
  // {data,loading} = useQuery
  // [load,{data,loading}] = useLazyQuery 
  return (
    <ApolloProvider client={outerClient}>
        {/* <button onClick={load()} */}
        <Inner />
    </ApolloProvider>
  )
}

export default App