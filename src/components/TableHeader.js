import React, { Component, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const TableHeader = ({ headers, onSorting }) => {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");
  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };
  return (
    <thead>
      <tr>
        {headers.map(({ name, field, sortable }) => (
          <th className ="table-head-tag" style={{
            textAlign: "center",
            verticalAlign: "middle",
            padding: "12px",
          }}
            key={name}
            onClick={() => (sortable ? onSortingChange(field) : null)}
          >
            {name}
            
          </th>
        ))}
      </tr>
    </thead>
  );
};
