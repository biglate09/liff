import React, { Component } from 'react';
import { Modal, Input } from 'antd';

interface ITimeProps {
  taskId: number
  closePopup: ((taskId : number) => void);
  saveTime: ((taskId : number, time : number) => void);
  visible : boolean
}
interface ITimeState {
  time: number
}

class SetTime extends Component<ITimeProps, ITimeState> {
  state: ITimeState = {
    time: 0,
  };

  setTime(input : number){   
    if(input > 0){
      this.setState({time: input});
    }   
  }

  render(){
    return (
      <Modal
      visible={this.props.visible}
      title="จับเวลา"
      okText="เริ่มจับเวลา"
      cancelText="ยกเลิก"
      onCancel={() => this.props.closePopup(0)}
      onOk={() => this.props.saveTime(this.props.taskId, this.state.time)}

      >
        <Input style={{ width: '90%' }} placeholder="จับเวลา" onChange={(e) => this.setTime(Number(e.target.value))}/>
      </Modal>
    
    )
  }
}

export default SetTime;
