import React, { useState, useMemo, useEffect, Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaUserEdit } from "react-icons/fa";
import { CgUserRemove } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";

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

  const [deleteModal, setDeleteModal] = useState(false);

  const [addModal, setAddModal] = useState(false);

  const [currentDriver, setCurrentDriver] = useState(null);

  const [id, setId] = useState(currentDriver ? currentDriver.id : "");
  const [name, setName] = useState(currentDriver ? currentDriver.name : "");
  const [phone, setPhone] = useState(currentDriver ? currentDriver.phone : "");
  const [teamId, setTeamId] = useState(
    currentDriver ? currentDriver.teamId : ""
  );
 
  const [loginId, setLoginId] = useState(
    currentDriver ? currentDriver.loginId : ""
  );
  const [plate, setPlate] = useState(currentDriver ? currentDriver.plate : "");

  const headers = [
    { name: "ID", field: "id", sortable: true },
    { name: "Họ tên", field: "name", sortable: true },
    { name: "Số điện thoại", field: "phone", sortable: true },
    { name: "Mã đăng nhập", field: "loginId", sortable: true },
    { name: "Biển kiểm soát", field: "plate", sortable: true },
    { name: "Mã đơn vị", field: "teamId", sortable: true },
    { name: "", sortable: false },
  ];

  const toggle = (driver) => {
    setModal(!modal);
    if (!modal) {
      setCurrentDriver(driver);
      setId(driver.id)
      setName(driver.name);
      setPhone(driver.phone);
      setPlate(driver.plate);
      setTeamId(driver.teamId);
      setLoginId(driver.loginId);
    }
  };

  const onToggleDelete = (driver) => {
    setDeleteModal(!deleteModal);
    if (!modal) {
      setCurrentDriver(driver);
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
        return setPlate(text);
      case "teamId":
        return setTeamId(text);
    }
  }

  function onRemoveDriver(driver) {
    setDrivers(drivers.filter((d) => currentDriver.id !== d.id));
    toast.error("Đã xóa thông tin tài xế", { position: toast.POSITION.TOP_CENTER, autoClose:2000 ,hideProgressBar: true});
    console.log(drivers)
  }

  function onAdd() {
    console.log(name, phone, teamId, plate);
    toast.success("Đã thêm thông tin tài xế", { position: toast.POSITION.TOP_CENTER, autoClose:2000 ,hideProgressBar: true});
  }
  function onUpdate() {
    console.log(name, phone, teamId, plate);
    toast.info("Thay đổi thành công", { position: toast.POSITION.TOP_CENTER, autoClose:2000 ,hideProgressBar: true});
  }
  // fetch data
  useEffect(async () => {
    const result = await axios.get("https://1ne1c.sse.codesandbox.io/drivers");

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
              {driversData.map((driver) => (
                <tr>
                  <td
                    scope="row"
                    className="id-column"
                    style={{
                      fontSize: "15px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0px",
                    }}
                  >
                    {driver.id}
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
                    className="number-column"
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
                    className="number-column"
                    scope="row"
                    className="id-column"
                    style={{
                      fontSize: "15px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0px",
                    }}
                  >
                    {driver.loginId}
                  </td>
    
                  
                  <td
                    className="number-column"
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
                    className="number-column"
                    scope="row"
                    className="id-column"
                    style={{
                      fontSize: "15px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0px",
                    }}
                  >
                    {driver.teamId}
                  </td>
                 
                  <td>
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

          <div className="col-md-12 d-flex flex-row-reverse p-0 pagination">
            <PaginationComponent
              total={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>

          {/* popup delete*/}
          <ModalEdit
            modal={deleteModal}
            toggle={onToggleDelete}
            onSubmit={onRemoveDriver}
            title={"Xóa tài xế"}
          >
            <p>Bạn muốn xóa thông tin tài xế này?</p>
          </ModalEdit>

          {/* popup edit*/}
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
                  Mã đơn vị
                </th>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <input
                    defaultValue={teamId}
                    onChange={(event) =>
                      onChangeValue(event.target.value, "teamId")
                    }
                  />
                </td>
              </tr>
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
              <tr>
                <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                  Mã đơn vị
                </th>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <input
                    defaultValue={""}
                    onChange={(event) =>
                      onChangeValue(event.target.value, "teamId")
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
