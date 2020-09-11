import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import {
  useQuery,
  useApolloClient,
  useSubscription,
  useLazyQuery,
  useMutation,
} from '@apollo/react-hooks'
import { 
  Form, 
  Input,
  Button,
  Upload
} from 'antd';
import liffHelper from '../../utils/liffHelper';
import { SEND_MESSAGE } from '../../utils/graphql';

const Register = () => {

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

  const normFile = (e:any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info:any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        console.log(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        console.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onFinish = (values:any) => {
    console.log(values);
    // ***** ยังไม่ได้ validate form
  };

  return (
    <body>
      <title>ลงทะเบียนช่างภาพ</title>
      <div style={{ margin: '1.5rem' }}>
        <p style={{ fontSize: '1.5em', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0' }}>ข้อมูลส่วนตัว</p>
        <Form onFinish={onFinish}>
          <Form.Item label="ชื่อ"
            name="name"
            rules={[{ required: true, message: 'กรุณาระบุชื่อ' }]}>
              <Input placeholder="กรุณาระบุชื่อ"  />
          </Form.Item>
          <Form.Item label="เบอร์โทร"
            name="tel"
            rules={[{ required: true, message: 'กรุณาระบุเบอร์โทร' }]}>
            <Input type="number" placeholder="กรุณาระบุเบอร์โทร" />
          </Form.Item>
          <Form.Item label="อีเมล"
            name="email"
            rules={[{ required: true, message: 'กรุณาระบุอีเมล' }]}>
            <Input type="email" placeholder="กรุณาระบุอีเมล" />
          </Form.Item>
          <hr/>
          <p style={{ fontSize: '1.5em', fontWeight: 'bold', marginTop: '1rem' }}>ผลงาน</p>
          <hr/>
          <p style={{ fontSize: '1.5em', fontWeight: 'bold', marginTop: '1rem' }}>ยืนยันตัวตน</p>
          <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload.Dragger name="files" action="/upload.do" {...props}>
              <u className="ant-upload-hint">อัพรูปบัตรประชาชน</u>
            </Upload.Dragger>
          </Form.Item>
          <Form.Item style={{textAlign:'center'}}>
            <Button type="primary" htmlType="submit">ลงทะเบียน</Button>
          </Form.Item>
        </Form>
      </div>
    </body>
  );
}


export default Register;
