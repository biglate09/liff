import React from 'react';
import {useHistory} from "react-router-dom";
import {
  useQuery,
  useApolloClient,
  useSubscription,
  useLazyQuery,
  useMutation,
} from '@apollo/react-hooks'
import { Form, Input, Button, Checkbox } from 'antd';
import {
  GET_USERS
} from '../../utils/graphql';

const Home = () => {
  const history = useHistory()
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  
  // const Demo = () => {
    const onFinish = () => {
      console.log('Success:')
      history.push('/SelectRole')  
    };

    const {
      data: users,
      loading: usersLoading,
    } = useQuery(GET_USERS);
  
  //   const onFinishFailed = errorInfo => {
  //     console.log('Failed:', errorInfo);
  //   };

  return (
    <div className="mt-12 text-3xl text-center text-bold">
      <div>{JSON.stringify(users)}</div>
      <h1>WELCOME TO Matching Photographer</h1>
      <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>

  );
}


export default Home;
