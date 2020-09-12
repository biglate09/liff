import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import {
  useQuery,
  useApolloClient,
  useSubscription,
  useLazyQuery,
  useMutation,
} from '@apollo/react-hooks'
import moment from 'moment';
import {
  Form,
  Select,
  DatePicker,
  TimePicker,
  Input,
  Button
} from 'antd';
// import liff from '@line/liff';
import liffHelper from '../../utils/liffHelper';
import { FIND_JOB_TYPES, CREATE_JOB } from '../../utils/graphql';

const timeFormat = 'HH:mm';
const dateFormat = 'YYYY-MM-DD';
const dateTimeFormat = 'YYYY-MM-DD HH:mm';
const { TextArea } = Input;

const CreateJobs = () => {
  // line user id poppy: U1a85d09a5b0f102277500c1f1b2026a8
  const [userId, setUserId] = useState('U8092eefd84fd7db732e2723587249c6d')
  const [userDisplayName, setUserDisplayName] = useState('bighead')
  liffHelper.getProfile()
    .then(profile => {
      console.log('profile', profile)
      // window.alert(JSON.stringify(profile))
      setUserId(profile.userId)
      setUserDisplayName(profile.displayName)
    });

  const { loading: jobloading, error, data: jobtype } = useQuery(FIND_JOB_TYPES, { fetchPolicy: 'network-only' })
  // console.log(jobtype && jobtype.jobTypes[0].id);
  const jobType = jobtype && jobtype.jobTypes
  // const jobType = [{id: '1', jobTypeName: 'แต่งงาน'},{id: '2', jobTypeName:'pre wedding'}]
  // const jobTypes = jobtype
  // const jobTypeItems = []
  // // for (const [index, value] of jobtype && jobtype.jobTypes) {
  // for (let value of jobtype){
  //   jobTypeItems.push(<Select.Option key={value.id} value={value.id}>{value.jobTypeName}</Select.Option>)
  // }
  // console.log(test)
  // Object.keys(test).map(key => (
  //   console.log(key)
  // ))

  const [createJob, { loading, data }] = useMutation(CREATE_JOB, {
    // fetchPolicy: 'network-only',
    onCompleted: (sre) => {
      window.alert('success')
    },
    onError: (err) => {
      window.alert(err)
    }
  });
  // const [sendMessage, { called, loading, data }] = useLazyQuery(
  //   SEND_MESSAGE
  // );
  // const [sendQuery, { loading, data}] = useMutation(SEND_MESSAGE, {
  //   // fetchPolicy: 'network-only',
  //   onCompleted:(sre)=>{
  //     window.alert('success')
  //   },
  //   onError: (err) => {
  //     window.alert(err)
  //   }
  // });

  const onFinish = async (values: any) => {
    // ***** ยังไม่ได้ validate form
    console.log(values);
    var sJob = moment(values.startJob.date)
    var eJob = moment(values.endJob.date)
    var jobName = `งาน${jobType.filter((v: any) => v.id == values.jobType)[0].jobTypeName} ${eJob.diff(sJob, 'days')} วัน`

    let createJobStatus = await createJob({
      variables: {
        userId: userId,
        jobName: jobName,
        jobTypeId: values.jobType,
        startJob: moment(`${moment(values.startJob.date).format(dateFormat)} ${moment(values.startJob.time || '00:00', timeFormat).format(timeFormat)}`).toDate(),
        endJob: moment(`${moment(values.endJob.date).format(dateFormat)} ${moment(values.endJob.time || '00:00', timeFormat).format(timeFormat)}`).toDate(),
        location: values.location || `{lat: 0,log: 0}`,
        guest: values.guest ? parseInt(values.guest) : 0,
        detail: values.detail || '',
        startBudget: values.startBudget ? parseInt(values.startBudget) : 0,
        endBudget: values.endBudget ? parseInt(values.endBudget) : 0,
        tel: values.tel || '',
        email: values.email || '',
        limit: moment().add(values.limit || 1, 'days').toDate(),
        displayName: userDisplayName,
        lineEmail: ''
      }
    })

    if(createJobStatus){
      liffHelper.closeWindow()
    }
  };

  return (
    <body>
      <title>ประกาศหาช่างภาพ</title>
      <div style={{ margin: '1.5rem' }}>
        <p style={{ fontSize: '1.5em', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0' }}>กรุณาระบุรายละเอียดงานของคุณ</p>
        <Form onFinish={onFinish}>
          <Form.Item label="ประเภทงาน"
            name="jobType"
            rules={[{ required: true, message: 'กรุณาเลือกประเภทงาน' }]}
          >
            <Select placeholder="กรุณาเลือกประเภทของงาน">
              {jobType && jobType.map((option: any) => (
                <Select.Option key={option.id} value={option.id}>{option.jobTypeName}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="วันเริ่มงาน">
            <Input.Group compact>
              <Form.Item name={['startJob', 'date']}
                rules={[{ required: true, message: 'กรุณาระบุวันเริ่มงาน' }]}
              >
                <DatePicker onChange={() => { }} disabledDate={d => !d || d.isBefore(Date.now())} />
              </Form.Item>
              <Form.Item name={['startJob', 'time']}>
                <TimePicker format={timeFormat} defaultValue={moment('00:00', timeFormat)} />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item label="วันสิ้นสุดงาน">
            <Input.Group compact>
              <Form.Item name={['endJob', 'date']}
                rules={[{ required: true, message: 'กรุณาระบุวันสิ้นสุดงาน' }]}
              >
                <DatePicker onChange={() => { }} />
              </Form.Item>
              <Form.Item name={['endJob', 'time']}>
                <TimePicker format={timeFormat} defaultValue={moment('00:00', timeFormat)} />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item label="สถานที่จัดงาน / ห้อง"
            name="location"
            rules={[{ required: true, message: 'กรุณาระบุข้อมูลสถานที่ และห้องจัดงาน' }]}
          >
            <Input placeholder="กรุณาระบุข้อมูลสถานที่ และห้องจัดงาน" />
          </Form.Item>
          <Form.Item label="จำนวนแขก"
            name="guest">
            <Input type="number" placeholder="กรุณาระบุจำนวนแขก" />
          </Form.Item>
          <Form.Item label="รายละเอียดงาน"
            name="detail">
            <TextArea rows={4} placeholder="กรุณาระบุรายละเอียดงาน" />
          </Form.Item>
          <Form.Item label="งบประมาณ" >
            <Input.Group compact>
              <Form.Item name="startBudget"
              // rules={[{ required: true, message: 'กรุณาระบุราคาต่ำสุด' }]}
              >
                <Input
                  style={{ width: 140, textAlign: 'center' }}
                  suffix="฿"
                  type="number"
                  placeholder="ราคาต่ำสุด" />
              </Form.Item>
              <Input style={{ width: 30, borderLeft: 0, borderRight: 0, pointerEvents: 'none', }} placeholder="-" disabled />
              <Form.Item name="endBudget"
              // rules={[{ required: true, message: 'กรุณาระบุงบราคาสูงสุด' }]}
              >
                <Input
                  style={{
                    width: 140,
                    textAlign: 'center',
                  }}
                  suffix="฿"
                  type="number"
                  placeholder="ราคาสูงสุด"
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <hr />
          <p style={{ fontSize: '1.5em', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0' }}>ข้อมูลการติดต่อ</p>
          <Form.Item label="เบอร์โทร"
            name="tel"
            rules={[{ required: true, message: 'กรุณาระบุเบอร์โทร' }]}
          >
            <Input type="number" placeholder="กรุณาระบุเบอร์โทร" />
          </Form.Item>
          <Form.Item label="อีเมล"
            name="email">
            <Input type="email" placeholder="กรุณาระบุอีเมล" />
          </Form.Item>
          <hr />
          <p style={{ fontSize: '1.5em', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0' }}>ระยะเวลาในการหาช่างภาพ</p>
          <Form.Item label="ต้องการหาช่างภาพให้ได้ (วัน)"
            name="limit"
            rules={[{ required: true, message: 'กรุณาระบุจำนวนวัน' }]}
          >
            <Input type="number" style={{ textAlign: 'center' }} defaultValue="1" prefix="ภายใน" suffix="วัน" />
          </Form.Item>
          <p style={{ fontSize: '0.8em', textAlign: 'center' }}> ข้อมูลสำคัญ กรุณากรอกให้ครบถ้วน</p>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">หาช่างภาพ</Button>
          </Form.Item>
        </Form>
      </div>
    </body>
  );
}


export default CreateJobs;
