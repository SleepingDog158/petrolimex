import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
export const BillCreate = () => {
  const [drivers, setDrivers] = useState([]);
  const [id, setId] = useState(null);
  const [currentDrivers, setCurrentDrivers] = useState([]);

  useEffect(async () => {
    const result = await axios.post("http://localhost:6060/getDrivers/", {});
    console.log(result.data.drivers);
    setDrivers(result.data.drivers);
  }, []);
  let checked = drivers?.find((d) => d.driverId === parseInt(id));
  function onChangeValue(text) {
    if (text.key !== "Enter") {
      return setId(text);
    }
  }
  function onSubmit(e) {
    if (e.key === "Enter"&& drivers!==null) {
      e.preventDefault()
      setCurrentDrivers(checked)
      console.log(currentDrivers)
    }
  }
 

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ marginTop: "10%" }}
    >
      <h3> Thông tin tài xế</h3>

      <div style={{ textAlign: "center", verticalAlign: "middle" }}>
        <form>
          <input
            className="w-100"
            type="text"
            defaultValue={" "}
            onChange={(event) => onChangeValue(event.target.value, "id")}
            onKeyDown={onSubmit}
            
          />
        </form>
      </div>
      <Table>
        
      </Table>
    </div>
  );
};
