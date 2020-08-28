import React, { useState, useMemo, useEffect, Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaUserEdit } from "react-icons/fa";
import { CgUserRemove } from "react-icons/cg";

import {PaginationComponent} from "./PaginationComponent";
import {Search} from "./Search";

export const DriversList = () => {
  const [drivers, setDrivers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const [search, setSearch] = useState('')

  useEffect(async () => {
    const result = await axios("https://1ne1c.sse.codesandbox.io/drivers");

    setDrivers(result.data);
  }, []);

    const driversData = useMemo(() => {
        let computedDrivers = drivers;
        if(search){
            computedDrivers=computedDrivers.filter(
                driver=>
                driver.name.toLowerCase().includes(search.toLowerCase())||
                driver.phone.includes(search)||
                driver.plate.toLowerCase().includes(search.toLowerCase())
            )
        }
        setTotalItems(computedDrivers.length)
        return computedDrivers.slice(
            (currentPage-1)*ITEMS_PER_PAGE,
            (currentPage-1)*ITEMS_PER_PAGE +ITEMS_PER_PAGE
        )
    }, [drivers, currentPage, search]);

  return (
    <div className="row w-100">
      <div className="col mb-3 col-11 text-center ml-4">
        <div className="row">
          <div className="col-md-6">
            <Search onSearch={(value)=>{
                setSearch(value)
                setCurrentPage(1);
            }}/>
          </div>
          
          <div className="col-md-6 d-flex flex-row-reverse p-0 pagination">
            <PaginationComponent 
            total ={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage ={currentPage}
            onPageChange={page=>setCurrentPage(page)}/>
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
                    scope="row" className="id-column"
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
                    <Button variant="primary" className="mr-1">
                      <FaUserEdit />
                    </Button>
                    <Button variant="danger">
                      <CgUserRemove />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};
