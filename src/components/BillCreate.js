import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Route, Link, useLocation } from "react-router-dom";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export const BillCreate = ({ currentDriver, setCurrentDriver }) => {
  const [id, setId] = useState(null);
  const [error, setError] = useState("");
  let query = useQuery();
  const getDriver = async (i) => {
    const result = await axios.post("http://localhost:6060/getDrivers/", {
      driverId: i,
    });
    if (result.data.drivers.length === 0) {
      return setError("Empty");
    } else {
      setCurrentDriver(result.data.drivers[0]);
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

  const renderCurrentDriver = () =>
    currentDriver && (
      <div>
        <h1>{currentDriver.driverId || ""}</h1>
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
