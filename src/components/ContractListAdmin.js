import React, { useState, useMemo, useEffect, Component } from 'react'
import axios from "axios"
import Table from "react-bootstrap/Table"
import { TableHeader } from "./TableHeader"
import { PaginationComponent } from "./PaginationComponent"
import { Search } from "./Search"

export const ContractListAdmin = () => {

    const [contract, setContract] = useState([]);
    const [contract_id, setId] = useState([]);
    const [currentContract, setCurrentContract] = useState(null);
    const [contract_partner, setPartner] = useState([]);
    const [contract_signed_date, setSignedDate] = useState([]);
    const [contract_start_date, setStartDate] = useState([]);
    const [contract_end_date, setEndDate] = useState([]);
    const [contract_debt_ceiling, setDebtCeiling] = useState([]);
    const [contract_status, setStatus] = useState([]);
    const [sorting, setSorting] = useState({ field: "", order: ""});
    const [search, setSearch] = useState("");
    const ITEM_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0);

    const headers = [
        { name: "ID", field: "contract_id", sortable: true },
        { name: "Tên công ty", field: "contract_partner", sortable: true },
        { name: "Ngày kí kết", field: "contract_signed_date", sortable: true },
        { name: "Ngày có hiệu lực", field: "contract_start_date", sortable: true },
        { name: "Ngày hết hiệu lực", field: "contract_end_date", sortable: true },
        { name: "Hạn mức", field: "contract_debt_ceiling", sortable: true },
        { name: "Trạng thái", field: "contract_status", sortable: true },
        { name: "", sortable: false }
    ];

    useEffect(async() => {
        const result = await axios.get("https://tnzio.sse.codesandbox.io/contract");
        console.log(result.data);
        setContract(result.data);
    }, []);

    const contractData = useMemo(() => {
        let processedContract = contract;
        if (search) {
            processedContract = processedContract.filter((contract) =>
                contract.contract_id.includes(search) ||
                contract.contract_partner.toLowerCase().includes(search.toLowerCase())
            );
        }
        setTotalItem(processedContract.length);
        if (sorting.field) {
            const reversed = sorting.order == "asc" ? 1: -1;
            processedContract = processedContract.sort(
                (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        return processedContract.slice(
            (currentPage - 1) * ITEM_PER_PAGE,
            (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE
        );
    }, [contract, currentPage, search, sorting]);

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
                    onSorting={(field, order) => setSorting({field, order})} />
                <tbody>
                    {contractData.map((contract) => (
                        <tr>
                            <td>
                                {contract.contract_id}
                            </td>
                            <td>
                                {contract.contract_partner}
                            </td>
                            <td>
                                {contract.contract_signed_date}
                            </td>
                            <td>
                                {contract.contract_start_date}
                            </td>
                            <td>
                                {contract.contract_end_date}
                            </td>
                            <td>
                                {contract.contract_debt_ceiling}
                            </td>
                            <td>
                                {contract.contract_status}
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
