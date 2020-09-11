import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
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
import { SEND_MESSAGE } from '../../utils/graphql';

const Quotation = () => {

  const [userId, setUserId] = useState('U1a85d09a5b0f102277500c1f1b2026a8')

  liffHelper.getProfile()
    .then(profile => {
      console.log('profile', profile)
      setUserId(profile.userId)
    });

  // const [sendMessage, { called, loading, data }] = useLazyQuery(
  //   SEND_MESSAGE
  // );
  const [sendQuery, { loading, data}] = useMutation(SEND_MESSAGE, {
    // fetchPolicy: 'network-only',
    onCompleted:(sre)=>{
      window.alert('success')
    },
    onError: (err) => {
      window.alert(err)
    }
  });

  return (
    <body>
      <title>กำหนดราคา #0001</title>
      <div style={{ margin: '1.5rem' }}>
        <p style={{ fontSize: '1.8em', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0' }}>งานแต่งงาน 1 วัน</p>
        <p style={{ fontWeight: 'bold' }}>1,000 - 2,000 บาท / วัน</p>
        <p style={{ marginBottom: '0' }}>เสนอราคา* (บาท / วัน)</p>
        <input style={{ border: '1px solid #c6c3b2', width: '100%', marginTop: '0.5rem', fontSize: '1.1em', padding: '0.5rem' }} type="number" pattern="\d*" placeholder="กรุณาระบุราคาที่ต้องการ" /><br />
        <div style={{ textAlign: 'center' }}>
          {data}
          {/* <button onClick={() => test()} style={{ backgroundColor: '#013490', color: 'white', padding: '1rem', borderRadius: '0.5rem', fontSize: '1.2em', marginTop: '1rem' }}>รับงานและเสนอราคา</button> */}
          <button onClick={() => sendQuery({variables: { userId: userId }})} style={{ backgroundColor: '#013490', color: 'white', padding: '1rem', borderRadius: '0.5rem', fontSize: '1.2em', marginTop: '1rem' }}>รับงานและเสนอราคา</button>
        </div>
      </div>
    </body>
  );
}


export default Quotation;
