import React, { useState, useMemo, useEffect, Component } from 'react'
import axios from "axios"
import Table from "react-bootstrap/Table"
import { TableHeader } from "./TableHeader"
import { PaginationComponent } from "./PaginationComponent"
import { Search } from "./Search"
import ModalEdit from './ModalAdmin'
import { toast } from 'react-toastify'
import './Admin.css'

export const ContractListPartner = () => {

    const [contracts, setContract] = useState([]);
    const [currentContract, setCurrentContract] = useState(null);
    const [sub_contract_id, setSubId] = useState(currentContract ? currentContract.sub_contract_id : "");
    const [gross_contract_id, setGrossId] = useState(currentContract ? currentContract.gross_contract_id : "");
    const [contract_signed_date, setSignedDate] = useState(currentContract ? currentContract.contract_signed_date : "");
    const [contract_start_date, setStartDate] = useState(currentContract ? currentContract.contract_start_date : "");
    const [contract_end_date, setEndDate] = useState(currentContract ? currentContract.contract_end_date : "");
    const [contract_debt_ceiling, setDebtCeiling] = useState(currentContract ? currentContract.contract_debt_ceiling : "");
    const [contract_remain_credit, setRemainCredit] = useState(currentContract ? currentContract.contract_remain_credit : "");
    const [contract_status, setStatus] = useState(currentContract ? currentContract.contract_status : "");
    const [sorting, setSorting] = useState({ field: "", order: ""});
    const [search, setSearch] = useState("");
    const ITEM_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0);
    const [modal, setModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const headers = [
        { name: "ID con", field: "sub_contract_id", sortable: true },
        { name: "ID tổng", field: "gross_contract_id", sortable: true },
        { name: "Ngày kí kết", field: "contract_signed_date", sortable: true },
        { name: "Ngày có hiệu lực", field: "contract_start_date", sortable: true },
        { name: "Ngày hết hiệu lực", field: "contract_end_date", sortable: true },
        { name: "Hạn mức", field: "contract_debt_ceiling", sortable: true },
        { name: "Hạn mức còn lại", field: "contract_remain_credit", sortable: true },
        { name: "Trạng thái", field: "contract_status", sortable: true },
        { name: "", sortable: false }
    ];

    const toggle = (contract) => {
        setModal(!modal);
        if(!modal) {
            setCurrentContract(contract);
            setSubId(contract.sub_contract_id);
            setGrossId(contract.contract_gross_id);
            setSignedDate(contract.contract_signed_date);
            setStartDate(contract.contract_start_date);
            setEndDate(contract.contract_end_date);
            setDebtCeiling(contract.contract_debt_ceiling);
            setRemainCredit(contract.contract_remain_credit);
            setStatus(contract.contract_status);
        }
    };

    const onToggleAdd = () => {
        setAddModal(!addModal);
    };

    const onToggleDelete = (contract) => {
        setDeleteModal(!deleteModal);
        if (!modal) {
            setCurrentContract(contract);
        }
    };

    function onChangeValue(content, type) {
        switch (type) {
            case "sub_contract_id":
                return setSubId(content);
            case "gross_contract_id":
                return setGrossId(content);
            case "contract_signed_date":
                return setSignedDate(content);
            case "contract_start_date":
                return setStartDate(content);
            case "contract_end_date":
                return setEndDate(content);
            case "contract_debt_ceiling":
                return setDebtCeiling(content);
            case "contract_remain_credit":
                return setRemainCredit(content);
            case "contract_status":
                return setStatus(content);
        }
    }

    function onAdd() {
        console.log(sub_contract_id, gross_contract_id, contract_signed_date, contract_start_date, contract_end_date, contract_debt_ceiling, contract_remain_credit, contract_status);
        toast.success("Đã thêm thông tin hợp đồng", { position: toast.POSITION.TOP_CENTER, autoClose: 2000, hideProgressBar: true });
    }

    function onRemove(contract) {
        setContract(contracts.filter((c) => currentContract.sub_contract_id !== c.sub_contract_id));
        toast.error("Đã xóa thông tin hợp đồng", { position: toast.POSITION.TOP_CENTER, autoClose: 2000, hideProgressBar: true});
    }

    useEffect(async() => {
        const result = await axios.get("https://tnzio.sse.codesandbox.io/contract");
        console.log(result.data);
        setContract(result.data);
    }, []);

    const contractData = useMemo(() => {
        let processedContract = contracts;
        if (search) {
            processedContract = processedContract.filter((contract) =>
                contract.sub_contract_id.includes(search) ||
                contract.gross_contract_id.includes(search)
            );
        }
        setTotalItem(processedContract.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1: -1;
            processedContract = processedContract.sort(
                (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        return processedContract.slice(
            (currentPage - 1) * ITEM_PER_PAGE,
            (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE
        );
    }, [contracts, currentPage, search, sorting]);

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
                            <td className="table-center">
                                {contract.sub_contract_id}
                            </td>
                            <td className="table-center">
                                {contract.gross_contract_id}
                            </td>
                            <td className="table-center">
                                {contract.contract_signed_date}
                            </td>
                            <td className="table-center">
                                {contract.contract_start_date}
                            </td>
                            <td className="table-center">
                                {contract.contract_end_date}
                            </td>
                            <td className="table-center">
                                {contract.contract_debt_ceiling}
                            </td>
                            <td className="table-center">
                                {contract.contract_remain_credit}
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
