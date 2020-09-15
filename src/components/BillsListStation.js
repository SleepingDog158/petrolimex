import React, { useState, useMemo, useEffect, Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaUserEdit } from "react-icons/fa";
import ModalEdit from "./ModalExample";
import { TableHeader } from "./TableHeader";
import { PaginationComponent } from "./PaginationComponent";
import {Search} from "./Search"
import { FilterbarStation } from "./FilterBarStation";

export const BillsListStation = () => {
  const [bills, setBills] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const [sorting, setSorting] = useState({ field: "", order: "" });

  const [search, setSearch] = useState("");

  const [modal, setModal] = useState(false);

  const [currentBill, setCurrentBill] = useState(null);

  const [id, setId] = useState(currentBill ? currentBill.id : "");
  const [stationId, setStationId] = useState(currentBill ? currentBill.stationId : "");
  const [date, setDate] = useState(currentBill ? currentBill.date : "");
  const [teamId, setTeamId] = useState(
    currentBill ? currentBill.teamId : ""
  );
 
  const [product, setProduct] = useState(
    currentBill ? currentBill.product : ""
  );
  const [quantity, setQuantity] = useState(currentBill ? currentBill.quantity : "");
  const [driver, setDriver] = useState(currentBill ? currentBill.driver : "");
  const [total, setTotal] = useState(currentBill ? currentBill.total : "");

  const headers = [
    { name: "ID", field: "id", sortable: true },
    { name: "Mã Công ty", field: "stationId", sortable: true },
    { name: "Ngày giao dịch", field: "date", sortable: true },
    { name: "Mặt hàng", field: "product", sortable: true },
    { name: "Thành tiền", field: "total", sortable: true },
    { name: "", sortable: false },
  ];

  const toggle = (bill) => {
    setModal(!modal);
    if (!modal) {
      setCurrentBill(bill);
      setId(bill.id)
      setStationId(bill.stationId);
      setDate(bill.date);
      setDriver(bill.driver);
      setTeamId(bill.teamId);
      setProduct(bill.product);
      setQuantity(bill.quantity);
      setTotal(bill.total);
    }
  };

  
 
  function onUpdate() {
    console.log("Seen");
  }
  // fetch data
  useEffect(async () => {
    const result = await axios.get("https://1ne1c.sse.codesandbox.io/bills");
    console.log(result.data);
    setBills(result.data);
  }, []);

  const billsData = useMemo(() => {
    let computedBills = bills;
    

    if (search) {
      computedBills = computedBills.filter(
        (bill) =>
          bill.phone.includes(search) ||
          driver.plate.toLowerCase().includes(search.toLowerCase())
      );
    }
    setTotalItems(computedBills.length);
    //sorting
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedBills = computedBills.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }
    return computedBills.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [bills, currentPage, search, sorting]);

  return (
    <div className="row w-100">
      <div className="col mb-3 col-11 ml-4">
        <div className="row">
            <FilterbarStation/>
          <Table className="col-12 ml-3" striped>
            <TableHeader
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {billsData.map((bill) => (
                <tr>
                  <td
                    scope="row"
                
                    style={{
                      fontSize: "15px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0px",
                    }}
                  >
                    {bill.id}
                  </td>
                  <td
                    style={{
                      width:"500px",
                      fontSize: "15px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0px",
                    }}
                  >
                    {bill.stationId}
                  </td>
                  <td
                    
                    style={{
                      fontSize: "15px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      width:"400px",
                      padding: "0px",
                    }}
                  >
                    {bill.date}
                  </td>
                  <td
                   
                    scope="row"
                    
                    style={{
                      fontSize: "15px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      width:"400px",
                      padding: "0px",
                    }}
                  >
                    {bill.product}
                  </td>
    
                  
                  <td
                    
                    style={{
                      fontSize: "15px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      width:"400px",
                      padding: "0px",
                    }}
                  >
                    {bill.total}
                  </td>
                 
                  <td>
                    <Button
                      variant="primary"
                      className="mr-1"
                      onClick={() => toggle(bill)}
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
          {/* <ModalEdit
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
          </ModalEdit> */}

         
        </div>
      </div>
    </div>
  );
};

// src= {driver ? driver.avatar : alt}
