import React, { useState, useMemo, useEffect, Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { CgDetailsMore } from "react-icons/cg";

import ModalEdit from "./ModalExample";
import { TableHeader } from "./TableHeader";
import { PaginationComponent } from "./PaginationComponent";
import { Search } from "./Search";

export const ContractList = () => {
  const [contracts, setContracts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const [sorting, setSorting] = useState({ field: "", order: "" });

  const [search, setSearch] = useState("");

  const [modal, setModal] = useState(false);

  const [currentContract, setCurrentContract] = useState(null);

  const [id, setId] = useState(currentContract ? currentContract.id : "");
  const [startDate, setStartDate] = useState(currentContract ? currentContract.setStartDate : "");
  const [signedDate, setSignedDate] = useState(currentContract ? currentContract.setSignedDate : "");
  const [expiredDate, setExpiredDate] = useState(currentContract ? currentContract.expiredDate : "");
  const [debtCeiling, setDebtCeiling] = useState(
    currentContract ? currentContract.debtCeiling : ""
  );
 
  const [status, setStatus] = useState(
    currentContract ? currentContract.status : ""
  );


  const headers = [
    { name: "ID", field: "id", sortable: false },
    { name: "Ngày kí kết", field: "signedDate", sortable: true },
    { name: "Ngày có hiệu lực", field: "startDate", sortable: true },
    { name: "Ngày kết thúc", field: "expiredDate", sortable: false },
    { name: "Hạn mức công nợ", field: "debtCeiling", sortable: true },
    { name: "Trạng thái", field: "status", sortable: true },
    { name: "Thao tác" },
  ];

  const toggle = (contract) => {
    setModal(!modal);
    if (!modal) {
      setCurrentContract(contract);
      setId(contract.id)
      setSignedDate(contract.signedDate);
      setStartDate(contract.startDate);
      setExpiredDate(contract.expiredDate);
      setDebtCeiling(contract.debtCeiling);
      setStatus(contract.status);
    }
  };


  // function onChangeValue(text, type) {
  //   switch (type) {
  //     case "name":
  //       return setName(text);
  //     case "phone":
  //       return setPhone(text);
  //     case "plate":
  //       return setPlate(text);
  //     case "teamId":
  //       return setTeamId(text);
  //   }
  // }

  // function onRemoveDriver(driver) {
  //   setContracts(contracts.filter((d) => currentContract.id !== d.id));
  // }

  // function onUpdate() {
  //   console.log(name, phone, teamId, plate);
  // }
  // fetch data
  useEffect(async () => {
    const result = await axios.get("https://1ne1c.sse.codesandbox.io/contracts");

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
    setContracts(result.data);
  }, []);

  const contractsData = useMemo(() => {
    let computedcontracts = contracts;
    if (search) {
      computedcontracts = computedcontracts.filter(
        (contract) =>
          contract.id.includes(search)
      );
    }
    setTotalItems(computedcontracts.length);
    //sorting
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedcontracts = computedcontracts.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }
    return computedcontracts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [contracts, currentPage, search, sorting]);

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
              {contractsData.map((contract) => (
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
                    {contract.id}
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
                    {contract.signedDate}
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
                    {contract.startDate}
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
                    {contract.expiredDate}
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
                    {contract.debtCeiling}
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
                    {contract.status}
                  </td>
                 
                  <td>
                    <Button
                      variant="primary"
                      className="mr-1"
                      onClick={() => toggle(contract)}
                     
                    >
                      <CgDetailsMore />
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
            // onSubmit={onUpdate}
            title={"Thông tin hợp đồng"}
          >
            <Table>
              <tr>
                <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                  Mã hợp đồng:
                </th>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {id}
                </td>
              </tr>
              <tr>
                <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                 Ngày kí kết
                </th>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {signedDate}
                </td>
              </tr>
              
              <tr>
                <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                  Ngày có hiệu lực
                </th>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {startDate}
                </td>
              </tr>
              <tr>
                <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                  Ngày kết thúc
                </th>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {expiredDate}
                </td>
              </tr>
              <tr>
                <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                  Hạn mức công nợ
                </th>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {debtCeiling}
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
