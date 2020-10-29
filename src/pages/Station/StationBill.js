import React, { useState, useEffect } from "react";
import NavBarStation from "../../components/NavBarStation";
import { Table, Button } from "react-bootstrap";
import "../../components/Client.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { BillCreate } from "../../components/BillCreate";
import Select from "react-select";
import ModalEdit from "../../components/ModalExample";
const StationBill = () => {
  const [currentDriver, setCurrentDriver] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const newDate = new Date().toLocaleDateString();
 
  const [transactionDate, setTransactionDate] =useState(newDate)
  const [billDriver, setBillDriver] = useState(null);
  const [billDriverId, setBillDriverId] = useState(null);
  const [gasStationId, setGasStationId] = useState(4);
  const [contractId, setContractId] = useState(4);
  const [billProductId, setBillProductId] = useState(null);
  const [billProduct, setBillProduct] = useState(null);
  const [billQuantity, setBillQuantity] = useState(null);
  const [billTotal, setBillTotal] = useState(null);
 
  const [total, setTotal] = useState(0);
  const [modal, setModal] = useState(false);
  const [cookies] = useCookies(["userId"]);
  const [products, setProducts] = useState([]);
  const [selectedValue, setSelectedValue] = useState(1);
  const stationId = cookies.userId;
  useEffect(async () => {
    const result = await axios.post("http://localhost:6060/getProducts/", {});
    
    setProducts(result.data.products);
  }, []);
  const data = products?.map((p) => {
    var newP = {};
    newP.label = p.name;
    newP.value = p.price;
    newP.id =p.productId
    return newP;
  });
  
  const handleChange = (e) => {
    setSelectedValue(e.value);
    setBillProduct(e.label)
    setBillProductId(e.id)
  };
  const toggle = () => {
    setModal(!modal);
    if (!modal) {
     
      setBillDriver(currentDriver.name);
      setBillDriverId(currentDriver.driverId);
      setBillQuantity(quantity);
      setBillTotal(total);
      setContractId(currentDriver.dividedContracts[0].contract.contractId)
    }
  };
  async function onCreate() {
    console.log(billDriverId, billQuantity, billTotal, contractId, transactionDate, billProductId,gasStationId);
    await axios.post("http://localhost:6060/createBill", {
      driverId: billDriverId,
      contractId: contractId,
      gasStationId: gasStationId,
      productId: billProductId,
      quantity:billQuantity,
       total: billTotal,
      transactionDate: transactionDate,
    }).then(res => {
      console.log(res);
      console.log(res.data);
    })
    // toast.success("Đã thêm thông tin tài xế", {
    //   position: toast.POSITION.TOP_CENTER,
    //   autoClose: 2000,
    //   hideProgressBar: true,
    // });
  }
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
                <Select
                  placeholder="Chọn mặt hàng"
                  value={data.find((obj) => obj.value === selectedValue)} // set selected value
                  options={data} // set list of the data
                  onChange={handleChange} // assign onChange function>
                />
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
                    setQuantity(currentQuantity);
                    setTotal(currentQuantity * selectedValue);
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
                    setQuantity(currentTotal / selectedValue);
                  }}
                />
              </td>
            </tr>
          </Table>
          <div>
            <Button variant="success" className="mr-5" size="lg" onClick={()=>toggle()} disabled={currentDriver === null}>
              Xác nhận
            </Button>
            <Button
              variant="danger"
              className="ml-5"
              size="lg"
              onClick={(event) => {
                event.preventDefault();
                window.location.reload();
              }}
            >
              Cancel
            </Button>
            <ModalEdit
            className="bill-list"
            modal={modal}
            toggle={toggle}
            title={"Chi tiết giao dịch"}
            onSubmit={onCreate}
          >
            <Table>
              <tbody>
                <tr>
                  {" "}
                  <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                    Ngày giao dịch
                  </th>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {transactionDate}
                  </td>
                </tr>
                <tr>
                  {" "}
                  <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                    Tài xế
                  </th>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {billDriver}
                  </td>
                </tr>
                <tr>
                  {" "}
                  <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                    Mặt hàng
                  </th>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {billProduct}
                  </td>
                </tr>
                <tr>
                  {" "}
                  <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                    Số lượng
                  </th>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {billQuantity}
                  </td>
                </tr>

                <tr>
                  {" "}
                  <th style={{ textAlign: "left", verticalAlign: "middle" }}>
                    Thành tiền
                  </th>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {billTotal} VNĐ
                  </td>
                </tr>
              </tbody>
            </Table>
          </ModalEdit>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationBill;
