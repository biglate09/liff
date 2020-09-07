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

const Home = () => {

  const [userId, setUserId] = useState('U8092eefd84fd7db732e2723587249c6d')

  liffHelper.getProfile()
    .then(profile => {
      console.log('profile', profile)
      setUserId(profile.userId)
    });

  const [sendMessage, { called, loading, data }] = useLazyQuery(
    SEND_MESSAGE
  );

  return (
    <body>
      <title>กำหนดราคา #0001</title>
      <div style={{ margin: '1.5rem' }}>
        <p style={{ fontSize: '1.8em', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0' }}>งานแต่งงาน 1 วัน</p>
        <p style={{ fontWeight: 'bold' }}>1,000 - 2,000 บาท / วัน</p>
        <p style={{ marginBottom: '0' }}>เสนอราคา* (บาท / วัน)</p>
        <input style={{ border: '1px solid #c6c3b2', width: '100%', marginTop: '0.5rem', fontSize: '1.1em', padding: '0.5rem' }} type="number" pattern="\d*" placeholder="กรุณาระบุราคาที่ต้องการ" /><br />
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => { sendMessage({ variables: { userId: userId } }); alert(userId); }} style={{ backgroundColor: '#013490', color: 'white', padding: '1rem', borderRadius: '0.5rem', fontSize: '1.2em', marginTop: '1rem' }}>รับงานและเสนอราคา</button>
        </div>
      </div>
    </body>
  );
}


export default Home;
