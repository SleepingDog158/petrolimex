import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import {
  Route,
  Link,
  useLocation
} from "react-router-dom";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export const BillCreate = () => {
  const [drivers, setDrivers] = useState([]);
  const [id, setId] = useState(null);
  const [currentDrivers, setCurrentDrivers] = useState([]);
  let query =useQuery()
  useEffect(async () => {
    const result = await axios.post("http://localhost:6060/getDrivers/", {});
    console.log(result.data.drivers);
    setDrivers(result.data.drivers);
  }, []);
 
  function onChangeValue(text) {
    if (text.key !== "Enter") {
      return setId(text);
    }
  }
  function onSubmit(e) {
    if (e.key === "Enter") {
      e.preventDefault()
      const {href} =window.location;
      window.location.href =`${href}/search?q=${parseInt(id)}`
    }
  }
  

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
      <Child search={query.get("q")}/>
    </div>
    </Route>
  );
};
function Child({ search }) {
  return (
    <div>
      {search ? (
        <h3>
          The <code>name</code> in the query string is &quot;{search}
          &quot;
        </h3>
      ) : (
        <h3>There is no name in the query string</h3>
      )}
    </div>
  );
}