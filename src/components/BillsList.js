import React, { useState, useMemo, useEffect} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaUserEdit } from "react-icons/fa";
import ModalEdit from "./ModalExample";
import { TableHeader } from "./TableHeader";
import { PaginationComponent } from "./PaginationComponent";

import { Filterbar } from "./FilterBar";

export const BillsList = () => {
  const [bills, setBills] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const [sorting, setSorting] = useState({ field: "", order: "" });

  const [modal, setModal] = useState(false);

  const [currentBill, setCurrentBill] = useState(null);

  const [billId, setBillId] = useState(currentBill ? currentBill.billId : "");
  const [gasStation, setGasStation] = useState(
    currentBill ? currentBill.gasStation : ""
  );
  const [transactionDate, setTransactionDate] = useState(
    currentBill ? currentBill.transactionDate : ""
  );

  const [product, setProduct] = useState(
    currentBill ? currentBill.product : ""
  );
  const [quantity, setQuantity] = useState(
    currentBill ? currentBill.quantity : ""
  );
  const [driver, setDriver] = useState(currentBill ? currentBill.driver : "");
  const [total, setTotal] = useState(currentBill ? currentBill.total : "");

  const headers = [
    { name: "ID", field: "id", sortable: true },
    { name: "Cửa hàng", field: "stationName", sortable: true },
    { name: "Ngày giao dịch", field: "date", sortable: true },
    { name: "Mặt hàng", field: "product", sortable: true },
    { name: "Thành tiền", field: "total", sortable: true },
    { name: "", sortable: false },
  ];

  const toggle = (bill) => {
    setModal(!modal);
    if (!modal) {
      setCurrentBill(bill);
      setBillId(bill.billId);
      setTransactionDate(bill.transactionDate);
      setGasStation(bill.gasStation);
      setProduct(bill.product);
      setTotal(bill.total);
      setDriver(bill.driver);
      setQuantity(bill.quantity);
    }
  };

  
  // fetch data
  useEffect(async () => {
    const result = await axios.post("http://localhost:6060/getBills/", {});
    console.log(result.data.bills);
    setBills(result.data.bills);
  }, []);

  const billsData = useMemo(() => {
    let computedBills = bills;

    
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
  }, [bills, currentPage, sorting]);

  return (
    <div className="row w-100">
      <div className="col mb-3 col-11 ml-4">
        <div className="row">
          <Filterbar />
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
                    {bill.billId}
                  </td>
                  <td
                    style={{
                      width: "500px",
                      fontSize: "15px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0px",
                    }}
                  >
                    {bill.gasStation.name}
                  </td>
                  <td
                    style={{
                      fontSize: "15px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      width: "400px",
                      padding: "0px",
                    }}
                  >
                    {bill.transactionDate.slice(0, 10)}
                  </td>
                  <td
                    scope="row"
                    style={{
                      fontSize: "15px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      width: "400px",
                      padding: "0px",
                    }}
                  >
                    {bill.product.name}
                  </td>

                  <td
                    style={{
                      fontSize: "15px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      width: "400px",
                      padding: "0px",
                    }}
                  >
                    {bill.total} VNĐ
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
          <ModalEdit
            className="bill-list"
            modal={modal}
            toggle={toggle}
            title={"Chi tiết giao dịch"}
          >
            <Table>
              <tbody>
                <tr>
                  <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                    Mã hóa đơn:
                  </th>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {billId}
                  </td>
                </tr>
                <tr>
                  {" "}
                  <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                    Ngày giao dịch
                  </th>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {transactionDate.slice(0, 10)}
                  </td>
                </tr>
                <tr>
                  {" "}
                  <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                    Tài xế
                  </th>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {driver.name}
                  </td>
                </tr>
                <tr>
                  {" "}
                  <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                    Mặt hàng
                  </th>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {product.name}
                  </td>
                </tr>
                <tr>
                  {" "}
                  <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                    Số lượng
                  </th>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {quantity}L
                  </td>
                </tr>

                <tr>
                  {" "}
                  <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                    Thành tiền
                  </th>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {total} VNĐ
                  </td>
                </tr>
              </tbody>
            </Table>
          </ModalEdit>
        </div>
      </div>
    </div>
  );
};

// src= {driver ? driver.avatar : alt}
