import React, { useState, useMemo, useEffect, Component } from 'react'
import axios from "axios"
import Table from "react-bootstrap/Table"
import { TableHeaderAdmin } from "./TableHeaderAdmin"
import { Search } from "./Search"
import { PaginationComponent } from "./PaginationComponent"

export const PartnerList = () => {

    const [partner, setPartner] = useState([]);
    const [partner_id, setId] = useState([]);
    const [currentPartner, setCurrentPartner] = useState(null);
    const [partner_name, setName] = useState([]);
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [search, setSearch] = useState("");
    const ITEM_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0);
    const [modal, setModal] = useState([false]);

    const header = [
        { name: "Mã công ty", field: "partner_id", sortable: true },
        { name: "Tên công ty", field: "partner_name", sortable: true },
        { name: "", sortable: false }
    ];

    useEffect(async() => {
        const result = await axios.get("https://tnzio.sse.codesandbox.io/partner");
        console.log(result.data);
        setPartner(result.data);
    }, []);

    const partnerData = useMemo(() => {
        let processedPartner = partner;
        if (search) {
            processedPartner = processedPartner.filter((partner) => 
                partner.partner_id.includes(search) || 
                partner.partner_name.toLowerCase().includes(search.toLowerCase())
            );
        }
        setTotalItem(processedPartner.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            processedPartner = processedPartner.sort(
                (a, b) => reversed + a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        return processedPartner.slice(
            (currentPage - 1) * ITEM_PER_PAGE,
            (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE
        )
    }, [partner, currentPage, search, sorting]);

    return (
        <div>
            <div>
                <Search onSearch={(value) => {
                    setSearch(value);
                    setCurrentPage(1);
                }} />
            </div>
            <Table striped>
                <TableHeaderAdmin
                    header={header}
                    onSorting={(field, order) => setSorting({ field, order })}
                />
                <tbody>
                    {partnerData.map((partner) => (
                        <tr>
                            <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                {partner.partner_id}
                            </td>
                            <td style={{width: "500px", verticalAlign: "middle"}}>
                                {partner.partner_name}
                            </td>
                            <td style={{textAlign: "right", verticalAlign: "middle"}}>
                                <a href="/partner-main" className="admin-partner-detail-button">Xem chi tiết</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div>
                <PaginationComponent
                    total={totalItem}
                    itemsPerPage={ITEM_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)} />
            </div>
        </div>
    )
}
