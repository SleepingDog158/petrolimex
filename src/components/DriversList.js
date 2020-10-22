import React, { useState, useMemo, useEffect, Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaUserEdit } from "react-icons/fa";

import {  toast } from "react-toastify";

import ModalEdit from "./ModalExample";
import { TableHeader } from "./TableHeader";
import { PaginationComponent } from "./PaginationComponent";
import { Search } from "./Search";

export const DriversList = () => {
  const [drivers, setDrivers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const [sorting, setSorting] = useState({ field: "", order: "" });

  const [search, setSearch] = useState("");

  const [modal, setModal] = useState(false);

  

  const [addModal, setAddModal] = useState(false);

  const [currentDriver, setCurrentDriver] = useState(null);

  const [code, setCode] = useState(currentDriver ? currentDriver.code : "");
  const [residentId, setResidentId] = useState(currentDriver ? currentDriver.residentId : "");
  const [name, setName] = useState(currentDriver ? currentDriver.name : "");
  const [phone, setPhone] = useState(currentDriver ? currentDriver.phone : "");

  const [plate, setPlate] = useState(currentDriver ? currentDriver.plate : "");
  const [status, setStatus] = useState(currentDriver ? currentDriver.status : "");

  const headers = [
    { name: "Mã tài xế", field: "code", sortable: true },
    { name: "Họ tên", field: "name", sortable: true },
    { name: "Số điện thoại", field: "phone", sortable: true },
    { name: "Số CMND", field: "plate", sortable: true },
    { name: "Biển kiểm soát", field: "plate", sortable: true },
    { name: "Trạng thái", field: "status", sortable: true },
    { name: "", sortable: false },
  ];

  const toggle = (driver) => {
    setModal(!modal);
    if (!modal) {
      setCurrentDriver(driver);
      setCode(driver.code);
      setName(driver.name);
      setPhone(driver.phone);
      setPlate(driver.plate);
      setResidentId(driver.residentId);
      setStatus(driver.status);
    }
  };

 

  const onToggleAdd = () => {
    setAddModal(!addModal);
  };

  function onChangeValue(text, type) {
    switch (type) {
      case "name":
        return setName(text);
      case "phone":
        return setPhone(text);
      case "plate":
        return setResidentId(text);
      case "residentId":
        return setPlate(text);
      case "status":
        return setStatus(text);
    }
  }

  function onAdd() {
    console.log(name, phone, plate);
    toast.success("Đã thêm thông tin tài xế", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      hideProgressBar: true,
    });
  }
  function onUpdate() {
    console.log(name, phone, plate, residentId, status);
    toast.info("Thay đổi thành công", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      hideProgressBar: true,
    });
  }
  // fetch data
  useEffect(async () => {
    const result = await axios.post("http://localhost:6060/getDrivers/", {
      clientId: 1,
    });
    console.log(result.data.drivers);
    setDrivers(result.data.drivers);
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
    //sorting
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedDrivers = computedDrivers.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }
    return computedDrivers.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [drivers, currentPage, search, sorting]);

  return (
    <div className="row w-100">
      <div className="col mb-3 col-11 text-center ml-4">
        <div className="row">
          <div className="d-inline-flex col-md-12">
            <Button
              variant="success"
              className="mb-3 mr-5"
              onClick={() => onToggleAdd()}
            >
              Thêm
            </Button>
            <Search
              onSearch={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
            />
          </div>

          <Table className="col-12 ml-3" striped>
            <TableHeader
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {driversData.map((driver, i) => (
                <tr key={i}>
                  <td
                   
                    className="id-column"
                    style={{
                      fontSize: "15px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0px",
                    }}
                  >
                    {driver.code}
                  </td>
                  <td
                    className="name-column"
                    style={{
                      fontSize: "15px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0px",
                    }}
                  >
                    {driver.name}
                  </td>
                  <td
                    
                    style={{
                      fontSize: "15px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0px",
                    }}
                  >
                    {driver.phone}
                  </td>
                  <td
                    style={{
                      fontSize: "15px",
                      textAlign: "center",  
                      verticalAlign: "middle",
                      padding: "0px",
                    }}
                  >
                    {driver.residentId}
                  </td>
                  <td
                    style={{
                      fontSize: "15px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0px",
                    }}
                  >
                    {driver.plate}
                  </td>
                  <td
                    style={{
                      fontSize: "15px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0px",
                    }}
                  >
                    {driver.status}
                  </td>

                  <td>
                    <Button
                      variant="primary"
                      className="mr-1"
                      onClick={() => toggle(driver)}
                    >
                      <FaUserEdit />
                    </Button>
                    
                      
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="col-md-12 d-flex flex-row-reverse p-0 pagination">
            <PaginationComponent
              total={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>

         

          {/* popup edit*/}
          <ModalEdit
            modal={modal}
            toggle={toggle}
            onSubmit={onUpdate}
            title={"Thông tin tài xế"}
          >
            <Table>
              <tbody>
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
                    Số CMND
                  </th>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    <input
                      defaultValue={residentId}
                      onChange={(event) =>
                        onChangeValue(event.target.value, "residentId")
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
                <tr>
                  <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                    Trạng thái
                  </th>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    <select defaultValue={status} onChange={(event)=> onChangeValue(event.target.value, "status")} style={{width:"100%"}}>
                      <option value="active">active</option>
                      <option value="inactive">inactive</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </Table>
          </ModalEdit>

          {/* popup create*/}
          <ModalEdit
            modal={addModal}
            toggle={onToggleAdd}
            onSubmit={onAdd}
            title={"Thêm tài xế"}
          >
            <Table>
              <tr>
                <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                  Họ tên
                </th>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <input
                    defaultValue={""}
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
                    defaultValue={""}
                    onChange={(event) =>
                      onChangeValue(event.target.value, "phone")
                    }
                  />
                </td>
              </tr>

              <tr>
                <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                  Số CMND
                </th>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <input
                    defaultValue={""}
                    onChange={(event) =>
                      onChangeValue(event.target.value, "residentId")
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
                    defaultValue={""}
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
