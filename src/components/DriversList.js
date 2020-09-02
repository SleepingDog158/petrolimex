import React, { useState, useMemo, useEffect, Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaUserEdit } from "react-icons/fa";
import { CgUserRemove } from "react-icons/cg";

import ModalEdit from "./ModalExample";

import { PaginationComponent } from "./PaginationComponent";
import { Search } from "./Search";

export const DriversList = () => {
  const [drivers, setDrivers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const [search, setSearch] = useState("");

  const [modal, setModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  const [currentDriver, setCurrentDriver] = useState(null);

  const [name, setName] = useState(currentDriver ? currentDriver.name : "");
  const [phone, setPhone] = useState(currentDriver ? currentDriver.phone : "");
  const [creditLimit, setCreditLimit] = useState(
    currentDriver ? currentDriver.creditLimit : ""
  );
  const [creditRemain, setCreditRemain] = useState(
    currentDriver ? currentDriver.creditRemain : ""
  );
  const [plate, setPlate] = useState(currentDriver ? currentDriver.plate : "");

  const toggle = (driver) => {
    setModal(!modal);
    if (!modal) {
      setCurrentDriver(driver);
      setName(driver.name);
      setPhone(driver.phone);
      setCreditLimit(driver.creditLimit);
      setCreditRemain(driver.creditRemain);
      setPlate(driver.plate);
    }
  };

  const onToggleDelete = (driver) => {
    setDeleteModal(!deleteModal);
    if (!modal) {
      setCurrentDriver(driver);
    }
  };

  function onChangeValue(text, type) {
    switch (type) {
      case "name":
        return setName(text);
      case "phone":
        return setPhone(text);
      case "creditLimit":
        return setCreditLimit(text);
      case "creditRemain":
        return setCreditRemain(text);
      case "plate":
        return setPlate(text);
    }
  }

  function onRemoveDriver(driver) {
    setDrivers(drivers.filter((d) => currentDriver.id !== d.id));
  }

  function onUpdate() {
    console.log(name, phone, creditLimit, creditRemain, plate);
  }

  useEffect(async () => {
    const result = await axios.get("https://1ne1c.sse.codesandbox.io/");

    // // lay token tu cookie

    // let token = '...';
    // const result = await axios({
    //   method: "get",
    //   url: "http://localhost:8080/api/v1/driver",
    //   headers: {
    //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IndDU0tTb3NEQSIsImlhdCI6MTU5ODgwMDY3OSwiZXhwIjoxNTk4ODA3ODc5fQ.g7N8nNMkzpyd9DyJZLYpd6hSEyQlWbEhz5D7cGyNUgo`
    //   }
    // })

    console.log(result.data);
    setDrivers(result.data);
  }, []);

  const driversData = useMemo(() => {
    let computedDrivers = drivers;
    if (search) {
      computedDrivers = computedDrivers.filter(
        (driver) =>
          driver.name.toLowerCase().includes(search.toLowerCase()) ||
          driver.phone.includes(search) ||
          driver.plate.toLowerCase().includes(search.toLowerCase())
      );
    }
    setTotalItems(computedDrivers.length);
    return computedDrivers.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [drivers, currentPage, search]);

  return (
    <div className="row w-100">
      <div className="col mb-3 col-11 text-center ml-4">
        <div className="row">
          <div className="col-md-6">
            <Search
              onSearch={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="col-md-6 d-flex flex-row-reverse p-0 pagination">
            <PaginationComponent
              total={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>

          <Table className="col-12 ml-3" striped>
            <thead>
              <tr>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  ID
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  Họ tên
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  Số điện thoại
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  Hạn mức công nợ
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  Hạn mức còn lại
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  Biển kiểm soát
                </th>
                <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {driversData.map((driver) => (
                <tr>
                  <th
                    scope="row"
                    className="id-column"
                    style={{ textAlign: "center", verticalAlign: "middle" }}
                  >
                    {driver.id}
                  </th>
                  <td
                    style={{ textAlign: "center", verticalAlign: "middle" }}
                    className="name-column"
                  >
                    {driver.name}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {driver.phone}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {driver.creditLimit}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {driver.creditRemain}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {driver.plate}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    <Button
                      variant="primary"
                      className="mr-1"
                      onClick={() => toggle(driver)}
                    >
                      <FaUserEdit />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => onToggleDelete(driver)}
                    >
                      <CgUserRemove />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <ModalEdit
            modal={deleteModal}
            toggle={onToggleDelete}
            onSubmit={onRemoveDriver}
            title={"Xóa tài xế"}
          >
            <p>Bạn muốn xóa thông tin tài xế này?</p>
          </ModalEdit>

          <ModalEdit
            modal={modal}
            toggle={toggle}
            onSubmit={onUpdate}
            title={"Thông tin tài xế"}
          >
            <Table>
              <tr>
                <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                  Họ tên
                </th>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <input
                    defaultValue={name}
                    onChange={(event) =>
                      onChangeValue(event.target.value, "name")
                    }
                  />
                </td>
              </tr>
              <tr>
                <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                  Số điện thoại
                </th>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <input
                    defaultValue={phone}
                    onChange={(event) =>
                      onChangeValue(event.target.value, "phone")
                    }
                  />
                </td>
              </tr>
              <tr>
                <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                  Hạn mức công nợ
                </th>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <input
                    defaultValue={creditLimit}
                    onChange={(event) =>
                      onChangeValue(event.target.value, "creditLimit")
                    }
                  />
                </td>
              </tr>
              <tr>
                <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                  Hạn mức còn lại
                </th>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <input
                    defaultValue={creditRemain}
                    onChange={(event) =>
                      onChangeValue(event.target.value, "creditRemain")
                    }
                  />
                </td>
              </tr>
              <tr>
                <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                  Biển kiểm soát
                </th>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <input
                    defaultValue={plate}
                    onChange={(event) =>
                      onChangeValue(event.target.value, "plate")
                    }
                  />
                </td>
              </tr>
            </Table>
          </ModalEdit>
        </div>
      </div>
    </div>
  );
};

// src= {driver ? driver.avatar : alt}
