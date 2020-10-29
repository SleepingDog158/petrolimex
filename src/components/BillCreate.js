import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import placeholder from "../assets/placeholder.png"
import { Route, Link, useLocation } from "react-router-dom";
import userEvent from "@testing-library/user-event";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export const BillCreate = ({ currentDriver, setCurrentDriver }) => {
  const [id, setId] = useState(null);
  const [error, setError] = useState("");
  let query = useQuery();
  const getDriver = async (i) => {
    const result = await axios.post("http://localhost:6060/transaction", {
      driverId: i,
    });
    if (!result.data.driver) {
      return setError("Empty");
    } else {
      setCurrentDriver(result.data.driver);
    }
  };
  function onChangeValue(text) {
    if (text.key !== "Enter") {
      return setId(text);
    }
  }
  async function onSubmit(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(id);
      try {
        await getDriver(id);
        
      } catch (error) {
        console.log(error);
      }
    }
  }
  console.log(currentDriver)
 
  const renderCurrentDriver = () =>
    currentDriver && (
      <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <img src={placeholder} alt="placeholder" style={{width: "150px", height:"150px"}}/>
        <Table>
          <tbody>
            <tr>
              <th>Họ tên</th>
              <td>{currentDriver.name}</td>
            </tr>
            <tr>
              <th>Mã tài xế</th>
              <td>{currentDriver.code}</td>
            </tr>
            <tr>
              <th>Biển kiểm soát</th>
              <td>{currentDriver.plate}</td>
            </tr>
            <tr>
              <th>Hạn mức còn lại</th>
              <td>{currentDriver.dividedContracts[0]?.creditRemain} VNĐ</td>
            </tr>
            <tr>
              <th>Mức giao dịch tối đa</th>
              <td>{currentDriver.dividedContracts[0]?.max_transaction} VNĐ</td>
            </tr>
            
          </tbody>
        </Table>
      </div>
    );

  return (
    <Route>
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
        <div>{currentDriver ? renderCurrentDriver() : <h2>{error}</h2>}</div>
      </div>
    </Route>
  );
};
