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
    const [contract_id, setId] = useState(currentContract ? currentContract.contract_id : "");
    const [contract_signed_date, setSignedDate] = useState(currentContract ? currentContract.contract_signed_date : "");
    const [contract_start_date, setStartDate] = useState(currentContract ? currentContract.contract_start_date : "");
    const [contract_end_date, setEndDate] = useState(currentContract ? currentContract.contract_end_date : "");
    const [contract_debt_ceiling, setDebtCeiling] = useState(currentContract ? currentContract.contract_debt_ceiling : "");
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
        { name: "ID", field: "contract_id", sortable: true },
        { name: "Ngày kí kết", field: "contract_signed_date", sortable: true },
        { name: "Ngày có hiệu lực", field: "contract_start_date", sortable: true },
        { name: "Ngày hết hiệu lực", field: "contract_end_date", sortable: true },
        { name: "Hạn mức", field: "contract_debt_ceiling", sortable: true },
        { name: "Trạng thái", field: "contract_status", sortable: true },
        { name: "", sortable: false }
    ];

    const toggle = (contract) => {
        setModal(!modal);
        if(!modal) {
            setCurrentContract(contract);
            setId(contract.contract_id);
            setSignedDate(contract.contract_signed_date);
            setStartDate(contract.contract_start_date);
            setEndDate(contract.contract_end_date);
            setDebtCeiling(contract.contract_debt_ceiling);
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
            case "contract_id":
                return setId(content);
            case "contract_signed_date":
                return setSignedDate(content);
            case "contract_start_date":
                return setStartDate(content);
            case "contract_end_date":
                return setEndDate(content);
            case "contract_debt_ceiling":
                return setDebtCeiling(content);
            case "contract_status":
                return setStatus(content);
        }
    }

    function onAdd() {
        console.log(contract_id, contract_signed_date, contract_start_date, contract_end_date, contract_debt_ceiling, contract_status);
        toast.success("Đã thêm thông tin hợp đồng", { position: toast.POSITION.TOP_CENTER, autoClose: 2000, hideProgressBar: true });
    }

    function onUpdate() {
        console.log(contract_id, contract_signed_date, contract_start_date, contract_end_date, contract_debt_ceiling, contract_status);
        toast.info("Thay đổi thông tin thành công!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000, hideProgressBar: true });
    }

    function onRemove(contract) {
        setContract(contracts.filter((c) => currentContract.contract_id !== c.contract_id));
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
                contract.contract_id.includes(search)
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
                <button className="admin-add-button" onClick = {() => onToggleAdd()}>
                    Thêm hợp đồng
                </button>
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
                                {contract.contract_id}
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
                            <td>
                                {contract.contract_status}
                            </td>
                            <td>
                                <button className="admin-edit-button" onClick = {() => toggle(contract)}>
                                    Sửa
                                </button>
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
            <ModalEdit modal = {modal} toggle = {toggle} onSubmit = {onUpdate} title = {"Thông tin hợp đồng"}>
                <Table>
                    <tr>
                        <th>Ngày kí kết</th>
                        <td>
                            <input
                                defaultValue = {contract_signed_date}
                                onChange = {(event) => onChangeValue(event.target.value, "contract_signed_date")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Ngày có hiệu lực</th>
                        <td>
                            <input
                                defaultValue = {contract_start_date}
                                onChange = {(event) => onChangeValue(event.target.value, "contract_start_date")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Ngày hết hiệu lực</th>
                        <td>
                            <input
                                defaultValue = {contract_end_date}
                                onChange = {(event) => onChangeValue(event.target.value, "contract_end_date")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Hạn mức</th>
                        <td>
                            <input
                                defaultValue = {contract_debt_ceiling}
                                onChange = {(event) => onChangeValue(event.target.value, "contract_debt_ceiling")}
                            />
                        </td>
                    </tr>
                </Table>
            </ModalEdit>
            <ModalEdit modal = {addModal} toggle = {onToggleAdd} onSubmit = {onToggleAdd} title = {"Thêm hợp đồng"}>
                <Table>
                    <tr>
                        <th>Ngày kí kết</th>
                        <td>
                            <input
                                defaultValue = {""}
                                onChange = {(event) => onChangeValue(event.target.value, "contract_signed_date")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Ngày có hiệu lực</th>
                        <td>
                            <input
                                defaultValue = {""}
                                onChange = {(event) => onChangeValue(event.target.value, "contract_start_date")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Ngày hết hiệu lực</th>
                        <td>
                            <input
                                defaultValue = {""}
                                onChange = {(event) => onChangeValue(event.target.value, "contract_end_date")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Hạn mức</th>
                        <td>
                            <input
                                defaultValue = {""}
                                onChange = {(event) => onChangeValue(event.target.value, "contract_debt_ceiling")}
                            />
                        </td>
                    </tr>
                </Table>
            </ModalEdit>
        </div>
    )
}
