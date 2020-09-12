import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import {
  useQuery,
  useApolloClient,
  useSubscription,
  useLazyQuery,
  useMutation,
} from '@apollo/react-hooks'
import { Tabs, Card } from 'antd';
// import liff from '@line/liff';
import liffHelper from '../../utils/liffHelper';
import { SEND_MESSAGE } from '../../utils/graphql';

const JobCard = () => {
  return (
    <Card style={{ fontSize: '12px', borderRadius: '10px', boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)' }}>
      <div className="flex items-center justify-between">
        <div>ประกาศงาน #0001</div>
        <div className="status" style={{color: '#F36E0E'}}>รอลูกค้าโอนเงินจอง</div>
      </div>
      <div className="title font-bold " style={{fontSize: '24px',marginTop:'10px'}}>งานแต่งงาน 1 วัน</div>
      <div className="guest">จำนวนแขก 200 คน</div>
      <div className="location" style={{margin:'10px 0 20px 0'}}>ที่ Villa de Bua  414, ถนน เทพรักษ์ แขวง ท่าแร้ง เขต บางเขน ห้อง Ball Room</div>
      <div className="font-bold">ระยะเวลา</div>
      <div className="grid grid-cols-10">
        <div className="col-span-5">เริ่ม 15 / 08 / 2020</div>
        <div className="col-span-5 text-right">07:00 น.</div>
        <div className="col-span-5">ถึง 15 / 08 / 2020</div>
        <div className="col-span-5 text-right">17:00 น.</div>
      </div>
      <div className="reatePrice font-bold text-center" style={{fontSize: '16px',margin:'10px 0'}}>1,000 - 2,000 บาท / วัน</div>
      <div className="cancel text-center"><a href="#" className="text-black underline">ยกเลิกงาน</a></div>
    </Card>
  )
}

const MyJobs = () => {

  const [userId, setUserId] = useState('U1a85d09a5b0f102277500c1f1b2026a8')

  liffHelper.getProfile()
    .then(profile => {
      console.log('profile', profile)
      setUserId(profile.userId)
    });
  
  const { TabPane } = Tabs;
  function callback(key:any) {
    console.log(key);
  }

  return (
    <body>
      <title>งานของฉัน</title>
      <div style={{ margin: '1.5rem' }}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="On going" key="ongoing">
          <JobCard/>
        </TabPane>
        <TabPane tab="Completed" key="completed">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Canceled / Fail" key="fail">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      </div>
    </body>
  );
}


export default MyJobs;