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

    useEffect(() => {
      async function fetchData(){
      const result = await axios.get("https://1ne1c.sse.codesandbox.io/products");
      console.log(result.data);
      setProducts(result.data);}
      fetchData()
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
            {product.id}
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
            {product.product}
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
            {product.price}
          </td>
          </tr>
      ))}
    </tbody>
  </Table>
  );
}

export default GasPriceTable;