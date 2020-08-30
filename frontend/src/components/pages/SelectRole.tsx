import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

function SelectRole() {
  const history = useHistory()
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  // const roles = [
  //   React.createElement(roles, 'ca'),
  //   React.createElement(roles, 'ch')
  // ];
  const saveValue = (value: any) => {
    console.log('saveRole '+value);
    history.push('/TaskView') 
  };

  return (
    <div className="mt-12 text-3xl text-center text-bold">
      <h1>SELECT ROLES</h1>
          <Button onClick={() => saveValue('ca')} name="cashier" value="ca">
            เคาน์เตอร์
          </Button>
          <span>                   </span>
          <Button onClick={() => saveValue('ch')} name="chef" value="ch">
            ครัว
          </Button>  
   </div>)
}
export default SelectRole;
    


