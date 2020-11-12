import React, { useState, useMemo, useEffect } from 'react'
import axios from "axios"
import Table from "react-bootstrap/Table"
import { TableHeaderAdmin } from "./TableHeaderAdmin"
import { PaginationComponent } from "./PaginationComponent"
import { Search } from "./Search"
import ModalEdit from './ModalAdmin'
import './Admin.css'
import { toast } from 'react-toastify'

export const ContractListAdmin = () => {

    const [contracts, setContract] = useState([]);
    const [currentContract, setCurrentContract] = useState(null);
    const [code, setCode] = useState(currentContract ? currentContract.code : "");
    const [name, setName] = useState(currentContract ? currentContract.name : "");
    const [partner, setPartner] = useState(currentContract ? currentContract.partner : "");
    const [signedDate, setSignedDate] = useState(currentContract ? currentContract.signedDate : "");
    const [startDate, setStartDate] = useState(currentContract ? currentContract.startDate : "");
    const [expiredDate, setExpiredDate] = useState(currentContract ? currentContract.expiredDate : "");
    const [debtCeiling, setDebtCeiling] = useState(currentContract ? currentContract.debtCeiling : "");
    const [status, setStatus] = useState(currentContract ? currentContract.status : "");
    const [sorting, setSorting] = useState({ field: "", order: ""});
    const [search, setSearch] = useState("");
    const ITEM_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0);
    const [modal, setModal] = useState(false);
    const [clientId, setClientId] = useState(null);

    const header = [
        { name: "Mã hợp đồng", field: "code", sortable: true },
        { name: "Tên hợp đồng", field: "name", sortable: true },
        { name: "Tên công ty", field: "partner", sortable: true },
        { name: "Ngày kí kết", field: "signedDate", sortable: true },
        { name: "Ngày có hiệu lực", field: "startDate", sortable: true },
        { name: "Ngày hết hiệu lực", field: "expiredDate", sortable: true },
        { name: "Hạn mức", field: "debtCeiling", sortable: true },
        { name: "Trạng thái", field: "status", sortable: true },
        { name: "", sortable: false }
    ];

    const toggle = (contract) => {
        setModal(!modal);
        if(!modal) {
            setCurrentContract(contract);
            setCode(contract.code);
            setName(contract.name);
            setPartner(contract.partner);
            setSignedDate(contract.signedDate);
            setStartDate(contract.startDate);
            setExpiredDate(contract.expiredDate);
            setDebtCeiling(contract.debtCeiling);
            setStatus(contract.status);
            setClientId(contract.clientId);
        }
    };

    function onChangeValue(content, type) {
        switch (type) {
            case "code":
                return setCode(content);
            case "name":
                return setName(content);
            case "partner":
                return setPartner(content);
            case "signedDate":
                return setSignedDate(content);
            case "startDate":
                return setStartDate(content);
            case "expiredDate":
                return setExpiredDate(content);
            case "debtCeiling":
                return setDebtCeiling(content);
            case "status":
                return setStatus(content);
            case "clientId":
                return setClientId(content);
        }
    }

    function onUpdate() {
        console.log(code, partner, signedDate, startDate, expiredDate, debtCeiling, status);
        toast.info("Thay đổi thông tin thành công!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: true
        });
    }

    useEffect(async () => {
        const result = await axios.post("http://localhost:6060/getContracts/", {});
        console.log(result.data.contracts);
        setContract(result.data.contracts);
    }, []);

    const contractData = useMemo(() => {
        let processedContract = contracts;
        if (search) {
            processedContract = processedContract.filter((contract) =>
                contract.code.includes(search) ||
                contract.client.name.toLowerCase().includes(search.toLowerCase())
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
                }}
                />
            </div>
            <Table striped>
                <TableHeaderAdmin
                    header={header}
                    onSorting={(field, order) => setSorting({field, order})}
                />
                <tbody>
                    {contractData.map((contract) => (
                        <tr>
                            <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                {contract.code}
                            </td>
                            <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                {contract.name}
                            </td>
                            <td style={{width: "250px", verticalAlign: "middle"}}>
                                {contract.client.name}
                            </td>
                            <td style={{width: "100px", textAlign: "center", verticalAlign: "middle"}}>
                                {contract.signedDate}
                            </td>
                            <td style={{width: "100px", textAlign: "center", verticalAlign: "middle"}}>
                                {contract.startDate}
                            </td>
                            <td style={{width: "100px", textAlign: "center", verticalAlign: "middle"}}>
                                {contract.expiredDate}
                            </td>
                            <td style={{width: "100px", textAlign: "center", verticalAlign: "middle"}}>
                                {contract.debtCeiling}
                            </td>
                            <td style={{width: "100px", textAlign: "center", verticalAlign: "middle"}}>
                                {contract.status}
                            </td>
                            <td style={{textAlign: "right", verticalAlign: "middle"}}>
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
                    itemPerPage={ITEM_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
            <ModalEdit modal={modal} toggle={toggle} onSubmit={onUpdate} title={"Thông tin hợp đồng"}>
                <Table>
                    <tr>
                        <th>
                            Mã hợp đồng
                        </th>
                        <td>
                            <input
                                defaultValue={code}
                                onChange={(event) => onChangeValue(event.target.value, "code")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Tên đối tác
                        </th>
                        <td>
                            <input
                                defaultValue={partner}
                                onChange={(event) => onChangeValue(event.target.value, "partner")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Ngày kí kết
                        </th>
                        <td>
                            <input
                                defaultValue={signedDate}
                                onChange={(event) => onChangeValue(event.target.value, "signedDate")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Ngày có hiệu lực
                        </th>
                        <td>
                            <input
                                defaultValue={startDate}
                                onChange={(event) => onChangeValue(event.target.value, "startDate")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Ngày hết hiệu lực
                        </th>
                        <td>
                            <input
                                defaultValue={expiredDate}
                                onChange={(event) => onChangeValue(event.target.value, "expiredDate")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Hạn mức
                        </th>
                        <td>
                            <input
                                defaultValue={debtCeiling}
                                onChange={(event) => onChangeValue(event.target.value, "debtCeiling")}
                            />
                        </td>
                    </tr>
                </Table>
            </ModalEdit>
        </div>
    )
}
