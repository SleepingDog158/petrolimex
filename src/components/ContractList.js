import React, { useState, useMemo, useEffect, Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { CgDetailsMore } from "react-icons/cg";
import { CgUserRemove } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ModalEdit from "./ModalExample";
import { TableHeader } from "./TableHeader";
import { PaginationComponent } from "./PaginationComponent";
import { Search } from "./Search";
import { TableBody } from "@material-ui/core";
import useDrivers from "../customHook/useDrivers";

export const ContractList = () => {
  const [contracts, setContracts] = useState([]);
  const {
    //   drivers,
    onCheckDriver,
    
    onUpdate,
  } = useDrivers();
  const [unpicked, setUnpicked] = useState([]);
  const [dividedContracts, setDividedContracts] = useState([]);
  
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const [sorting, setSorting] = useState({ field: "", order: "" });

  const [search, setSearch] = useState("");

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);

  const [currentContract, setCurrentContract] = useState(null);
  const [contractId, setContractId] = useState(
    currentContract ? currentContract.contractId : ""
  );
  const [code, setCode] = useState(currentContract ? currentContract.code : "");

  const [startDate, setStartDate] = useState(
    currentContract ? currentContract.setStartDate : ""
  );
  const [signedDate, setSignedDate] = useState(
    currentContract ? currentContract.setSignedDate : ""
  );
  const [expiredDate, setExpiredDate] = useState(
    currentContract ? currentContract.expiredDate : ""
  );
  const [debtCeiling, setDebtCeiling] = useState(
    currentContract ? currentContract.debtCeiling : ""
  );
  const [creditRemain, setCreditRemain] = useState(
    currentContract ? currentContract.creditRemain : ""
  );

  const [status, setStatus] = useState(
    currentContract ? currentContract.status : ""
  );

  const headers = [
    { name: "Mã hợp đồng", field: "code", sortable: true },
    { name: "Tên hợp đồng", field: "name", sortable: true },
    { name: "Ngày kí kết", field: "signedDate", sortable: true },
    { name: "Ngày có hiệu lực", field: "startDate", sortable: true },
    { name: "Ngày kết thúc", field: "expiredDate", sortable: true },
    { name: "Hạn mức công nợ", field: "debtCeiling", sortable: true },
    { name: "Trạng thái", field: "status", sortable: true },
    { name: "" },
  ];

  const headerlist = [
    { name: "Mã tài xế", field: "code", sortable: false },
    { name: "Họ tên", field: "name", sortable: false },
    { name: "Số điện thoại", field: "phone", sortable: false },
    { name: "Biển kiểm soát", field: "plate", sortable: false },
    { name: "", sortable: false },
  ];
  const headerSubList = [
    { name: "Mã tài xế", field: "code", sortable: false },
    { name: "Họ tên", field: "name", sortable: false },
    { name: "Mức giao dịch tối đa", field: "plate", sortable: false },
    { name: "Hạn mức công nợ" },

    
  ];
  // async function fetch(i){

  //   return drivers
  // };
  async function toggle(contract) {
    setModal(!modal);
    if (!modal) {
      setCurrentContract(contract);
      setContractId(contract.contractId);
      setCode(contract.code);
      setSignedDate(contract.signedDate);
      setStartDate(contract.startDate);
      setExpiredDate(contract.expiredDate);
      setDebtCeiling(contract.debtCeiling);
      setCreditRemain(contract.creditRemain);
      setStatus(contract.status);
      const { data } = await axios.post(
        "http://localhost:6060/getToCreateDividedContract",
        {
          clientId: 1,
          contractId: contract.contractId,
        }
      );
      if (data) {
        setDividedContracts(data.contract.dividedContracts);
      }
      console.log(dividedContracts);
    }
  }

  async function toggleNested(contractId) {
    setNestedModal(!nestedModal);
    if(!nestedModal){
      
      const { data } = await axios.post(
        "http://localhost:6060/getToCreateDividedContract",
        {
          clientId: 1,
          contractId:contractId,
        }
      );
      if (data) {
        setUnpicked(data.drivers);
      }
      console.log(unpicked);
    }
  };

  // fetch data
  useEffect(async () => {
    const result = await axios.post("http://localhost:6060/getContracts/", {
      clientId: 1,
    });
    console.log(result.data.contracts);
    setContracts(result.data.contracts);
  }, []);

  // const unpicked = drivers.filter((d) => d.contractId === null);
  const contractsData = useMemo(() => {
    let computedContracts = contracts;
    if (search) {
      computedContracts = computedContracts.filter(
        (contract) =>
          contract.code.includes(search) ||
          contract.startDate.includes(search) ||
          contract.expiredDate.includes(search)
      );
    }
    setTotalItems(computedContracts.length);
    //sorting
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedContracts = computedContracts.sort(
        (a, b) =>
          reversed *
          a[sorting.field].toString().localeCompare(b[sorting.field].toString())
      );
    }
    return computedContracts.slice(
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
              {contractsData.map((contract, i) => (
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
                    {contract.code}
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
                    {contract.name}
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
            className="contract-list"
            modal={modal}
            toggle={toggle}
            onSubmit={onUpdate}
            title={"Thông tin hợp đồng"}
          >
            <Table>
              <tbody>
                <tr>
                  <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                    Mã hợp đồng:
                  </th>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {code}
                  </td>
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
                  <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                    Hạn mức còn lại
                  </th>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {creditRemain}
                  </td>
                </tr>
              </tbody>
            </Table>
            <tr>
              <td>
                <h5>Danh sách tài xế</h5>
                <Button
                  variant="success"
                  className="mr-1"
                  onClick={() => toggleNested(contractId)}
                  hidden={status !== "active"}
                >
                  Thêm tài xế
                </Button>
              </td>
            </tr>
            <Table className="mt-2">
              <TableHeader
                headers={headerSubList}
                onSorting={(field, order) => setSorting({ field, order })}
              />
              <tbody>
                {dividedContracts?.map((d,i) => (
                  <tr key={i}>
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
                      {d.driver.code}
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
                      {d.driver.name}
                    </td>

                    
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <input
                        onChange={(event) => {
                          let current = event?.target?.value;
                         
                        }}
                        disabled={status === "inactive"}
                        defaultValue={d.max_transaction}
                      />
                    </td>

                    
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <input
                        onChange={(event) => {
                          let current = event?.target?.value;
                         
                        }}
                        disabled={status === "inactive"}
                        defaultValue={d.creditLimit}
                      />
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </Table>
            <ModalEdit
              className="contract-list"
              modal={nestedModal}
              toggle={toggleNested}
              onSubmit={toggleNested}
              // showFooter={false}
              title={"Thông tin hợp đồng"}
            >
              <Table className="mt-2">
                <TableHeader
                  headers={headerlist}
                  onSorting={(field, order) => setSorting({ field, order })}
                />
                <tbody>
                  {unpicked.map((driver,i) => (
                    <tr key={i}>
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
                        style={{
                          fontSize: "15px",
                          textAlign: "center",
                          verticalAlign: "middle",
                          padding: "0px",
                        }}
                      >
                        {driver.plate}
                      </td>

                      <td>
                        <Button
                          onClick={() =>
                            onCheckDriver(driver.driverId, contractId)
                          }
                          variant="success"
                          className="mr-1"
                        >
                          <FaPlus />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ModalEdit>
          </ModalEdit>
        </div>
      </div>
    </div>
  );
};

// src= {driver ? driver.avatar : alt}
