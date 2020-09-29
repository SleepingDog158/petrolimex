import React, { useState } from 'react'

export const TableHeaderAdmin = ({ header, onSorting }) => {

    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");
    const onSortingChange = (field) => {
        const order = field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order);
    };

    return (
        <thead>
            <tr>
                {header.map(({ name, field, sortable }) => (
                    <th style={{textAlign: "center", verticalAlign: "middle"}} 
                        key={name}
                        onClick={() => (sortable ? onSortingChange(field) : null)}
                    >
                        {name}
                    </th>
                ))}
            </tr>
        </thead>
    )
}
