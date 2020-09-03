import React, { useState, useMemo, useEffect, Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaUserEdit } from "react-icons/fa";
import { CgUserRemove } from "react-icons/cg";

import ModalEdit from "./ModalExample";
import { TableHeader } from "./TableHeader";
import { PaginationComponent } from "./PaginationComponent";
import { Search } from "./Search";

export const ContractList = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(async () => {
    const result = await axios.get(
      "https://vjobc.sse.codesandbox.io/contracts"
    );
    console.log(result.data);
    setContracts(result.data);
  }, []);

  const headers = [
    { name: "ID", field: "id", sortable: false },
    { name: "Ngày tạo", field: "CreateDate", sortable: true },
    { name: "Ngày kết thúc", field: "ExpiredDate", sortable: false },
    { name: "Hạn mức công nợ", field: "DebtCeiling", sortable: true },
    { name: "Trạng thái", field: "Status", sortable: true },
    { name: "Thao tác" },
  ];

  const driversData = useMemo(() => {
    let computedContract = contracts;
  });

  return (
    <div>
      <Table>
        <TableHeader headers={headers} />
        <tbody>
          {contracts.map((contract) => (
            <tr>
              <td style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0px",
                    }}>{contract.id}</td>
              <td style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0px",
                    }}>{contract.CreateDate}</td>
              <td style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0px",
                    }}>{contract.ExpiredDate}</td>
              <td style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0px",
                    }}>{contract.DebtCeiling}</td>
              <td style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0px",
                    }}>{contract.Status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
