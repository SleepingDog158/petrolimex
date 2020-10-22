import React,{Component, useState, useEffect} from 'react'
import axios from "axios";
import { Table } from "react-bootstrap";
export const BillCreate = () => {
    const [drivers, setDrivers] = useState([]);
    const [id, setId] = useState();
    const [currentDrivers, setCurrentDrivers] = useState([]);
    let checked =[{"id":1}]
    useEffect(async () => {
      const result = await axios.post("http://localhost:6060/getDrivers/", {
        clientId: 1,
      });
      console.log(result.data.drivers);
      setDrivers(result.data.drivers);
    }, []);
      

      function onChangeValue(text) {
        return setId(text)
      }
    function onSubmit(e){
      if(e.keyCode==13&&e.shiftKey==false)
      console.log(id)
      setId(id)
    }

    return (
        <div className="d-flex flex-column align-items-center" style={{marginTop: "10%"}}>
            
                <h3> Thông tin tài xế</h3>

                <div style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <input  className="w-100" type="text" defaultValue={" "}
                  onChange={(event) =>
                    onChangeValue(event.target.value, "id")}
                    onKeyDown={onSubmit}
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
