import React, { useState } from "react";
import NavBarStation from "../../components/NavBarStation";
import { Table, Button } from "react-bootstrap";
import "../../components/Client.css";
import { BillCreate } from "../../components/BillCreate";
const StationBill = () => {
  const [currentDriver, setCurrentDriver] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const priceEach = 3000;
  // viet vao cho e
  // doi ten nua :V
  console.log(quantity);
  return (
    <div>
      <NavBarStation />
      <div className="container d-flex flex-row">
        <div
          className="user-side col-6 mr-1"
          style={{
            marginTop: "30px",
            height: "95vh",
            borderStyle: "outset",
          }}
        >
          <BillCreate
            currentDriver={currentDriver}
            setCurrentDriver={setCurrentDriver}
          />
        </div>
        <div
          className="bill-side col-6 ml-1 d-flex flex-column align-items-center"
          style={{ marginTop: "3.5%", borderStyle: "outset" }}
        >
          <h3 className="mt-5">Tạo hóa đơn</h3>
          <Table>
            <tr>
              <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                Loại nhiên liệu
              </th>
              <td style={{ textAlign: "right", verticalAlign: "middle" }}>
                <input className="col-11" defaultValue={""} />
              </td>
            </tr>
            <tr>
              <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                Số lượng (lit)
              </th>
              <td style={{ textAlign: "right", verticalAlign: "middle" }}>
                <input
                  className="col-11"
                  type="number"
                  value={quantity}
                  onChange={(event) => {
                    let currentQuantity = event?.target?.value;
                    setQuantity(currentQuantity); // can lam tron k a :v
                    setTotal(currentQuantity * priceEach);
                  }}
                />
              </td>
            </tr>
            <tr>
              <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                Thành tiền
              </th>
              <td style={{ textAlign: "right", verticalAlign: "middle" }}>
                <input
                  className="col-11"
                  value={total}
                  type="number"
                  onChange={(event) => {
                    let currentTotal = event?.target?.value;
                    setTotal(currentTotal);
                    setQuantity(currentTotal / priceEach); // vay ok r nhi ?????? dung vay
                  }}
                />
              </td>
            </tr>
          </Table>
          <div>
            <Button variant="success" className="mr-5" size="lg">
              Xác nhận
            </Button>

            <Button variant="danger" className="ml-5" size="lg">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationBill;
