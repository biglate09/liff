import React, { useState,useEffect,useRef } from 'react';
import Timer from './Timer';

interface ITaskProps {
  taskId: number
  taskName: string
  total: number
  userRole : string
  status : string
  finishDate : Date
  setTime: ((taskId : number) => void)
}

interface ITaskState {
}

function Task (props : ITaskProps) {
  const [ time, SetTime] = useState(0);

  useInterval(() => {
    const difference = props.finishDate.valueOf() - Date.now().valueOf();
    SetTime(difference > 0 ? difference : 0);
  }, 200);

  var click = function handleClick  (){
    console.log("click div test")
    if(props.userRole === "CHEF" && props.status === "PENDING")
      props.setTime(props.taskId)
  }

  return (
    <div>      
      <div onClick={click}>
        <table>
          <tbody>
            <tr>
              <td>{props.taskName}</td>
              <td><Timer time={time} /></td>
            </tr>
            <tr><td colSpan={2} style={{textAlign:"center",fontSize: 18}}>{props.total}</td></tr>
            <tr><td colSpan={2} style={{textAlign:"center",backgroundColor:time === 0 && props.status === "ONGOING" ? "red" : ""}}>{props.status}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    )
}

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default Task;
