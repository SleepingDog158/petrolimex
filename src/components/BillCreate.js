import React,{Component, useState, useEffect} from 'react'
import axios from "axios";
import { Table } from "react-bootstrap";
export const BillCreate = () => {
    const [drivers, setDrivers] = useState([]);
    const [id, setId] = useState();
    const [currentDrivers, setCurrentDrivers] = useState([]);
    let checked =[]
    useEffect(async () => {
        const result = await axios.get("https://1ne1c.sse.codesandbox.io/drivers");
        console.log(result.data);
        setDrivers(result.data);
      }, []);
      function onEnter(){
          checked= drivers.filter((d)=>d.id === id)
          return checked
          console.log(checked)
      }

      const onInputChange=(value)=>{
        setId(value);
        
    }

    return (
        <div className="d-flex flex-column align-items-center">
            
                <h3> Thông tin tài xế</h3>

                <div style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <input  className="form-control w-100" type="text" value={id}
                    onKeyDown={onEnter}
                    onChange={(e)=>onInputChange(e.target.value)}
                  />
                </div>
                <Table>
                <tbody>
                    {checked.map((d)=>
                    <td>{d.id}</td>)}
                </tbody>
            </Table>
        </div>
    )
}
