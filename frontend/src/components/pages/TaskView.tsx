import React, { useState } from 'react'
import Task from './Task';
import InsertTask from './InsertTask';
import SetTime from './SetTime';
import { Button } from 'antd';

function TaskView() {
  const userName = "Dream";
  const [ userRole, setUserRole] = useState("CASHIER");
  const [ taskList, setTaskList] = useState([{taskId : 0, taskName: "", total: 0, status:"0", finishDate: new Date(), remainTime: 0}]);
  const [ insertTask, setInsertTask ] = useState(false)
  const [ setTime, setSetTime ] = useState(false)
  const [ runningTaskId , setRunningTaskId ] = useState(0)
  const [ curTaskId, setCurTaskId ] = useState(0)

  const toggleRole = () => {
    if(userRole === "CASHIER"){
      setUserRole("CHEF")
      setInsertTask(false)
    }
    else
      setUserRole("CASHIER")
  }

  const toggleInsertTaskPopup = () => {
    setInsertTask(!insertTask)
  }

  const addTask = (taskName : string,total : number) => {
    var i = runningTaskId + 1;
    const obj = {'taskId':i,'taskName':taskName, 'total':total,'status':"PENDING", finishDate: new Date(), remainTime: 0};
    const newArray = taskList.slice();
    newArray.push(obj);
    setTaskList(newArray);
    setInsertTask(!insertTask)
    setRunningTaskId(i);
  }

  const toggleSetTimePopup = (taskId: number) => {
    setCurTaskId(taskId)
    setSetTime(!setTime)
  }

  const updateFinishDate = (taskId : number,time : number) => {
    var finishDate = new Date(); // get current date
    finishDate.setHours(finishDate.getHours() ,finishDate.getMinutes() + time,finishDate.getSeconds() ,finishDate.getMilliseconds());

    var seconds = time * 60;
    var newArray = taskList.map(el => (el.taskId === taskId ? Object.assign({}, el, { status: "ONGOING", finishDate : finishDate, remainTime : seconds }) : el))
    setTaskList(newArray)
    setSetTime(!setTime)
  }

  return (
    <div style={{margin:"2em"}}>
      <p>
        {userRole} : {userName} : <Button onClick={toggleRole} type="primary">Change Role</Button>
      </p>
    
      {taskList.map((item, i) =>{
        return(
          <div key={i} style={{visibility: item.taskId > 0 ? "visible" : "hidden"
                                , display : item.taskId > 0 ? "block" : "none"}}>
            <Task taskId={item.taskId} taskName={item.taskName} total={item.total} userRole={userRole}
              status={item.status} finishDate={item.finishDate}
              setTime={toggleSetTimePopup}/>
          </div>
          )
      })}

      <Button id="btnAddTask" type="dashed" onClick={toggleInsertTaskPopup} 
        style={{visibility: userRole === "CASHIER" ? "visible" : "hidden"}}> + เพิ่มโต๊ะ</Button>
      
      {insertTask &&
          <InsertTask closePopup={toggleInsertTaskPopup} addTask={addTask} visible={insertTask}/>
      }

      {setTime && userRole === "CHEF" && <SetTime taskId={curTaskId} closePopup={toggleSetTimePopup} 
        saveTime={updateFinishDate} visible={setTime}/>}
    </div>
  );
}

export default TaskView;
