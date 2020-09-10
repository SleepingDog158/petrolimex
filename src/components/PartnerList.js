import React, { useState, useMemo, useEffect, Component } from 'react'
import axios from "axios"
import Table from "react-bootstrap/Table"
import { TableHeader } from "./TableHeader"
import { Search } from "./Search"
import { PaginationComponent } from "./PaginationComponent"
import ModalEdit from "./ModalExample"

export const PartnerList = () => {

    const [partner, setPartner] = useState([]);
    const [partner_id, setId] = useState([]);
    const [currentPartner, setCurrentPartner] = useState(null);
    const [partner_name, setName] = useState([]);
    const [partner_address, setAddress] = useState([]);
    const [partner_tax_id, setTaxId] = useState([]);
    const [partner_payment_limit, setPaymentLimit] = useState([]);
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [search, setSearch] = useState("");
    const ITEM_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0);
    const [modal, setModal] = useState([false]);

    const headers = [
        { name: "ID", field: "partner_id", sortable: true },
        { name: "Tên công ty", field: "partner_name", sortable: true },
        { name: "Địa chỉ", field: "partner_address", sortable: false },
        { name: "Mã số thuế", field: "partner_tax_id", sortable: true },
        { name: "Hạn mức", field: "partner_payment_limit", sortable: true},
        { name: "", sortable: false }
    ];

    const toggle = (setPartner) => {
        setModal(!modal);
        if (!modal) {
            setCurrentPartner(partner);
            setId(partner.partner_id);
            setName(partner.partner_name);
            setAddress(partner.partner_address);
            setTaxId(partner.partner_tax_id);
            setPaymentLimit(partner.partner_payment_limit);
        }
    }

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
                partner.partner_name.toLowerCase().includes(search.toLowerCase()) || 
                partner.partner_tax_id.includes(search)
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
                <TableHeader
                    headers={headers}
                    onSorting={(field, order) => setSorting({ field, order })}
                />
                <tbody>
                    {partnerData.map((partner) => (
                        <tr>
                            <td>
                                {partner.partner_id}
                            </td>
                            <td>
                                {partner.partner_name}
                            </td>
                            <td>
                                {partner.partner_address}
                            </td>
                            <td>
                                {partner.partner_tax_id}
                            </td>
                            <td>
                                {partner.partner_payment_limit}
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