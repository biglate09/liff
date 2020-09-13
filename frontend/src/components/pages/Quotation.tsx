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
  const [message, setMessage] = useState('รับงาน x วัน #0000 ในราคา x,xxx บาท/วัน')

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

  console.log('job_data', job_data)

  const { loading: jobmappingloading, error: jobmappingerror, data: jobmapping } = useQuery(FIND_JOB_MAPPING, {
    fetchPolicy: 'network-only',
    variables: {
      jobId: jobId,
      photographerUserId: userId
    }
  })
  console.log(jobmapping)
  const find_mapping = jobmapping && jobmapping.findJobMapping


  const [JOB_MAPPING_CREATE, { loading, data }] = useMutation(CREATE_JOB_MAPPING, {
    // fetchPolicy: 'network-only',
    onCompleted: (sre) => {
      window.alert('success')
      liffHelper.sendMessages([{
        type: 'text',
        text: message
      }])
      liffHelper.closeWindow()
    },
    onError: (err) => {
      window.alert(err)
    }
  });

  const onFinish = (values: any) => {
    console.log(values)
    setMessage(`รับ${job_data && job_data.jobName} #${job_data && job_data.jobNo} ในราคา ${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(values.price)} บาท/วัน`)
    const mappingJob = JOB_MAPPING_CREATE({
      variables: {
        jobId: jobId,
        photographerUserId: userId,
        price: parseFloat(values.price)
      }
    })

    if (mappingJob) {
      liffHelper.closeWindow()
    }
  }
  if (find_mapping) {
    liffHelper.closeWindow()
    window.alert(JSON.stringify(find_mapping))
    return false
  } else {
    return (
      <body>
        <title>กำหนดราคา #{job_data && job_data.jobNo}</title>
        <div style={{ margin: '1.5rem' }}>
          <div style={{ marginTop: '1rem' }}>กำหนดราคา #{job_data && job_data.jobNo}</div>
          <p style={{ fontSize: '1.8em', fontWeight: 'bold', marginBottom: '0' }}>{job_data && job_data.jobName}</p>
          <p style={{ fontWeight: 'bold' }}>{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(job_data && job_data.startBudget)} - {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(job_data && job_data.endBudget)} บาท / วัน</p>
          <Form onFinish={onFinish}>
            <Form.Item label="เสนอราคา (บาท/วัน)"
              name="price"
              rules={[{ required: true, message: 'กรุณาระบุราคา' }]}
            >
              <Input type="number" style={{ textAlign: 'center' }} suffix="฿" pattern="\d*" />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit" className="p-1">รับงานและเสนอราคา</Button>
            </Form.Item>
          </Form>
        </div>
      </body>
    );
  }
}


export default Quotation;
