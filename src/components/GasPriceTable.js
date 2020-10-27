import React, { useState, useMemo, useEffect, Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

import { TableHeader } from "./TableHeader";


const GasPriceTable = () => {
  const [products, setProducts] = useState([]);
  const headers = [
    { name: "ID", field: "id" },
    { name: "Sản phẩm", field: "product" },
    { name: "Giá", field: "price"},
    ]

    useEffect(async () => {
      const result = await axios.post("http://localhost:6060/getProducts/", {});
      console.log(result.data.products);
      setProducts(result.data.products);
    }, []);
  return (
    <Table className="col-12 ml-3" bordered>
    <TableHeader
      headers={headers}
    />
    <tbody>
      {products.map((product,i) => (
        <tr key={i}>
          <td className="w-25"
            scope="row"
            style={{
              fontSize: "15px",
              textAlign: "center",
              verticalAlign: "middle",
              height:"30px",  
              padding: "3px",
            }}
          >
            {product.code}
          </td>
          <td className="w-50"
            style={{
              fontSize: "15px",
              textAlign: "left",
              verticalAlign: "middle",
              height:"40px", 
              padding: "3px",
            }}
          >
            {product.name}
          </td>
          <td
            style={{
              fontSize: "15px",
              textAlign: "center",
              verticalAlign: "middle",
              height:"30px", 
              padding: "3px",
            }}
          >
            {product.price} VNĐ
          </td>
          </tr>
      ))}
    </tbody>
  </Table>
  );
}

export default GasPriceTable;