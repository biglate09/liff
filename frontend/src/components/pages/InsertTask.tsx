import React, { Component } from 'react';
import { Modal, Input, Radio } from 'antd';

interface ITaskProps {
  closePopup: (() => void)
  addTask: ((taskName : string, total : number) => void)
  visible : boolean
}

interface ITaskState {
  taskName: string
  total: number
  taskType: string
}

const options = [
  { label: 'โต๊ะ', value: 'T' },
  { label: 'คิว', value: 'Q' }
];

class InsertTask extends Component<ITaskProps, ITaskState> {
  
  state: ITaskState = {
    taskName: "",
    total: 0,
    taskType: "T"
  };
  
  setTaskName(input : string){
    this.setState({ taskName: input })
  }

  setTotal(input : number){
    if(input > 0)
      this.setState({ total: input })
  }

  setTaskType(input : string){
    this.setState({ taskType: input })
  }

  getTaskName(){
    if(this.state.taskType === "T")
      return "โต๊ะ" + this.state.taskName
    else
      return "คิว" + this.state.taskName
  }

  render(){
    return (
      <Modal
      visible={this.props.visible}
      title="เพิ่มออเดอร์"
      okText="บันทึก"
      cancelText="ยกเลิก"
      onCancel={this.props.closePopup}
      onOk={() => this.props.addTask(this.getTaskName(), this.state.total)}

      >
        <Input.Group compact>
          <Radio.Group
            options={options}
            onChange={(e) => this.setTaskType(e.target.value)}
            value={this.state.taskType}
            optionType="button"
            style={{ width: '25%' }}
          />
          <Input style={{ width: '75%' }} placeholder="เลขโต๊ะหรือเลขคิว" onChange={(e) => this.setTaskName(e.target.value)}/>
        </Input.Group>
        <Input.Group compact>
          <div style={{ width: '25%' }}>จำนวนเข่ง</div>
          <Input style={{ width: '75%' }} placeholder="จำนวนเข่ง" onChange={(e) => this.setTotal(parseInt(e.target.value))}/>
        </Input.Group>
      </Modal>
    
    )
  }
}

export default InsertTask;
