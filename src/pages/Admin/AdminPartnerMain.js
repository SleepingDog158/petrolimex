import React, { useState, useEffect, useMemo } from "react";
import NavBar from "../../components/NavBar";
import "../../components/Admin.css";
import PieChart from "../../components/PieChart";
import axios from "axios";
import { useParams } from "react-router-dom";
import ModalEdit from '../../components/ModalAdmin'
import Table from 'react-bootstrap/Table'

export const AdminPartnerMain = () => {
  const { clientId } = useParams();
  console.log(clientId);
  const [partner, setPartner] = useState([]);
  const [currentPartner, setCurrentPartner] = useState(null);
  const [modal, setModal] = useState(false);
  const [code, setCode] = useState(currentPartner ? currentPartner.code : "");
  const [name, setName] = useState(currentPartner ? currentPartner.name : "");
  const [taxId, setTaxId] = useState(currentPartner ? currentPartner.taxId : "");
  const [address, setAddress] = useState(currentPartner ? currentPartner.address : "");
  const [max_payment_limit, setLimit] = useState(currentPartner ? currentPartner.max_payment_limit : "")

  const toggle = (partner) => {
    setModal(!modal);
    if (!modal) {
      setCurrentPartner(partner);
      setCode(partner.code);
      setName(partner.name);
      setTaxId(partner.taxId);
      setAddress(partner.address);
      setLimit(partner.max_payment_limit);
    }
  }

    function onChangeValue(content, type) {
        switch (type) {
            case "code":
                return setCode(content);
            case "taxId":
                return setTaxId(content);
            case "name":
                return setName(content);
            case "address":
                return setAddress(content);
            case "max_payment_limit":
                return setLimit(content);
        }
    }

    useEffect(async () => {
      const result = await axios.post("http://localhost:6060/getClients/", {
        clientId: clientId,
      });
      console.log(result.data.clients);
      setPartner(result.data.clients);
    }, []);
  
    const partnerData = useMemo(() => {
      let processedPartner = partner;
      return processedPartner.slice();
    }, [partner]);

    async function onUpdate() {
      console.log(name, code, taxId, address, max_payment_limit, clientId);
      await axios.post("http://localhost:6060/updateClient", {
        name: name,
        code: code,
        taxId: taxId,
        address: address,
        max_payment_limit: max_payment_limit,
        clientId: clientId,
      }).then(res => {
        console.log(res);
        console.log(res.data);
      })
      window.location.reload()
    }

  return (
    <div>
      <NavBar />
      <div className="admin-partner-main-content">
        {partnerData.map((partner) => (
          <div className="admin-partner-main-left-content">
            <h2 className="admin-partner-main-header">
              {partner.name}
            </h2>
            <table className="admin-partner-main-table">
              <tr>
                <th colSpan="2" className="admin-partner-main-table-header">
                  Thông tin công ty
                </th>
              </tr>
              <tr>
                <td>Mã công ty:</td>
                <td>{partner.code}</td>
              </tr>
              <tr>
                <td>Địa chỉ:</td>
                <td>{partner.address}</td>
              </tr>
              <tr>
                <td>Mã số thuế:</td>
                <td>{partner.taxId}</td>
              </tr>
              <tr>
                <td>Hạn mức công nợ (VNĐ):</td>
                <td>{partner.max_payment_limit}</td>
              </tr>
            </table>
            <div className="admin-partner-main-grid">
              <a
                href={`/admin/partner/${clientId}/contract`}
                className="admin-partner-main-grid-button"
              >
                Hợp đồng
              </a>
              <a
                href={`/admin/partner/${clientId}/driver`}
                className="admin-partner-main-grid-button"
              >
                Tài xế
              </a>
              <a
                href={`/admin/partner/${clientId}/bill`}
                className="admin-partner-main-grid-button"
              >
                Giao dịch
              </a>
              <a
                className="admin-partner-main-grid-button"
                onClick={() => toggle(partner)}
              >
                Sửa thông tin
              </a>
            </div>
          </div>
        ))}
        <ModalEdit
          modal={modal}
          toggle={toggle}
          onSubmit={onUpdate}
          title={"Thông tin công ty"}
        >
          <Table>
            <tr>
              <th>
                Mã công ty
              </th>
              <td>
                <input
                  defaultValue={code}
                  onChange={(event) => onChangeValue(event.target.value, "code")}
                />
              </td>
            </tr>
            <tr>
              <th>
                Tên công ty
              </th>
              <td>
                <input
                  defaultValue={name}
                  onChange={(event) => onChangeValue(event.target.value, "name")}
                />
              </td>
            </tr>
            <tr>
              <th>
                Mã số thuế
              </th>
              <td>
                <input
                  defaultValue={taxId}
                  onChange={(event) => onChangeValue(event.target.value, "taxId")}
                />
              </td>
            </tr>
            <tr>
              <th>
                Địa chỉ
              </th>
              <td>
                <input
                  defaultValue={address}                    onChange={(event) => onChangeValue(event.target.value, "address")}
                />
              </td>
            </tr>
            <tr>
              <th>
                Hạn mức công nợ
              </th>
              <td>
                <input
                  defaultValue={max_payment_limit}
                  onChange={(event) => onChangeValue(event.target.value, "max_payment_limit")}
                />
              </td>
            </tr>
          </Table>
        </ModalEdit>
        <div className="admin-partner-main-chart">
          <PieChart />
        </div>
      </div>
    </div>
  );
};
