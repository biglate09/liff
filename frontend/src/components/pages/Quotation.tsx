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
import { FIND_JOB_MAPPING, FIND_JOB, CREATE_JOB_MAPPING } from '../../utils/graphql';

const Quotation = () => {

  const [userId, setUserId] = useState('U1a85d09a5b0f102277500c1f1b2026a8')
  const [jobId, setjobId] = useState('47581143-838c-4e76-9a67-e71e969e55fe')

  liffHelper.getProfile()
    .then(profile => {
      console.log('profile', profile)
      setUserId(profile.userId)
    });
  
  const { loading: jobloading, error: joberror, data: job } = useQuery(FIND_JOB, { 
    fetchPolicy: 'network-only',
    variables: {
      jobId: jobId,
    }
  })

  const job_data = job && job.findJob

  console.log('job_data',job_data)

  const { loading: jobmappingloading, error:jobmappingerror, data: jobmapping } = useQuery(FIND_JOB_MAPPING, { 
    fetchPolicy: 'network-only',
    variables: {
      jobId: jobId,
      photographerUserId: userId
    }
  })
  console.log(jobmapping)
  const find_mapping = jobmapping && jobmapping.findJobMapping
  
  
  const [JOB_MAPPING_CREATE, { loading, data}] = useMutation(CREATE_JOB_MAPPING, {
    // fetchPolicy: 'network-only',
    onCompleted:(sre)=>{
      window.alert('success')
    },
    onError: (err) => {
      window.alert(err)
    }
  });
  
  const onFinish = (values:any) => {
    console.log(values)
    JOB_MAPPING_CREATE({variables:{
      jobId: jobId,
      photographerUserId: userId,
      price: parseFloat(values.price)
    }})
  }
  if(find_mapping){
    liffHelper.closeWindow()
    window.alert(JSON.stringify(find_mapping))
    return false
  }else{
    return (
      <body>
        <title>กำหนดราคา #0001</title>
        <div style={{ margin: '1.5rem' }}>
    <p style={{ fontSize: '1.8em', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0' }}>{job_data && job_data.jobName}</p>
          <p style={{ fontWeight: 'bold' }}>{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(job_data && job_data.startBudget)} - {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(job_data && job_data.endBudget)} บาท / วัน</p>
          <Form onFinish={onFinish}>
            <Form.Item label="เสนอราคา (บาท/วัน)"
              name="price"
              rules={[{ required: true, message: 'กรุณาระบุราคา' }]}
              >
              <Input type="number" style={{textAlign: 'center'}} suffix="฿" pattern="\d*"/>
            </Form.Item>
            <Form.Item style={{textAlign:'center'}}>
              <Button type="primary" htmlType="submit" className="p-1">รับงานและเสนอราคา</Button>
            </Form.Item>
          </Form>
        </div>
      </body>
    );
  }
}


export default Quotation;
