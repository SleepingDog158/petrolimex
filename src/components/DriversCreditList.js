import React, { useState, useMemo, useEffect, Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

import { TableHeader } from "./TableHeader";
import { PaginationComponent } from "./PaginationComponent";
import { Search } from "./Search";

export const DriversCreditList = () => {
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
  const [creditLimit, setCreditLimit] = useState(
    currentDriver ? currentDriver.creditLimit : ""
  );
  const [creditRemain, setCreditRemain] = useState(
    currentDriver ? currentDriver.creditRemain : ""
  );
 
  const [plate, setPlate] = useState(currentDriver ? currentDriver.plate : "");

  const headers = [
    { name: "ID", field: "id", sortable: true },
    { name: "Họ tên", field: "name", sortable: true },
    { name: "Biển kiểm soát", field: "plate", sortable: true },
    { name: "Mã hợp đồng", field: "contractId", sortable: true },
    { name: "Hạn mức tổng (VNĐ)", field: "creditLimit", sortable: true },
    { name: "Hạn mức còn lại (VNĐ)", field: "creditRemain", sortable: true },
  ];


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
    setDrivers(result.data.filter((d)=> d.contractId !== null));
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
          <div className="d-inline-flex col-md-12 mb-3 searchbar">
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
                      height:"48px"
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
                    {driver.plate}
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
                    {driver.contractId}
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
                    {driver.creditLimit}
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
                    {driver.creditRemain}
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

         
        </div>
      </div>
    </div>
  );
};

// src= {driver ? driver.avatar : alt}
