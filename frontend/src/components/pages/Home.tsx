import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import {
  useQuery,
  useApolloClient,
  useSubscription,
  useLazyQuery,
  useMutation,
} from '@apollo/react-hooks'
import { Form, Input, Button, Checkbox } from 'antd';
// import liff from '@line/liff';
import liffHelper from '../../utils/liffHelper';

const Home = () => {
  const [displayName, setDisplayName] = useState('');

  liffHelper.getProfile()
   .then(profile => {
      console.log('profile',profile)
      setDisplayName(profile.displayName)
   });

  return (
    <div className="mt-12 text-3xl text-center text-bold">
      <h1>WELCOME TO Matching Photographer</h1>  
      <div>displayName : {displayName}</div>
      <div>info : {JSON.stringify(liffHelper.getLIFFInfo())}</div>
    </div>
  );
}


export default Home;
