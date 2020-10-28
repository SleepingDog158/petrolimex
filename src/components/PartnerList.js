import React, { useState, useMemo, useEffect } from 'react'
import axios from "axios"
import Table from "react-bootstrap/Table"
import { TableHeaderAdmin } from "./TableHeaderAdmin"
import { Search } from "./Search"
import { PaginationComponent } from "./PaginationComponent"
import { AdminPartnerMain } from '../pages/Admin/AdminPartnerMain'
import { Switch, useParams, Link, Route } from "react-router-dom";
export const PartnerList = () => {

    const [partner, setPartner] = useState([]);
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [search, setSearch] = useState("");
    const ITEM_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0);

    const header = [
        { name: "Mã công ty", field: "code", sortable: true },
        { name: "Tên công ty", field: "name", sortable: true },
        { name: "", sortable: false }
    ];

    useEffect(async () => {
        const result = await axios.post("http://localhost:6060/getClients/", {});
        console.log(result.data.clients);
        setPartner(result.data.clients);
    }, []);

    const partnerData = useMemo(() => {
        let processedPartner = partner;
        if (search) {
            processedPartner = processedPartner.filter((partner) => 
                partner.code.includes(search) || 
                partner.name.toLowerCase().includes(search.toLowerCase())
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
                                {partner.code}
                            </td>
                            <td style={{width: "500px", verticalAlign: "middle"}}>
                                {partner.name}
                            </td>
                            <td style={{textAlign: "right", verticalAlign: "middle"}}>
                                <a href={`/admin/partner/${partner.clientId}`} className="admin-partner-detail-button">
                                    Xem chi tiết
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div>
                <PaginationComponent
                    total={totalItem}
                    itemPerPage={ITEM_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
            <Switch>
            <Route path="/admin/partner/:clientId" component={AdminPartnerMain} />
            </Switch>
        </div>
    )
}
