import React, { useState, useMemo, useEffect } from 'react'
import axios from "axios"
import Table from "react-bootstrap/Table"
import { TableHeaderAdmin } from "./TableHeaderAdmin"
import { Search } from "./Search"
import { PaginationComponent } from "./PaginationComponent"
import { AdminPartnerMain } from '../pages/Admin/AdminPartnerMain'
import { Switch, Route } from "react-router-dom";
import ModalEdit from './ModalAdmin'

export const PartnerList = () => {
    const [partner, setPartner] = useState([]);
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [search, setSearch] = useState("");
    const ITEM_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0);
    const [modal, setModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [currentPartner, setCurrentPartner] = useState(null);
    const [code, setCode] = useState(currentPartner ? currentPartner.code : "");
    const [taxId, setTaxId] = useState(currentPartner ? currentPartner.taxId : "");
    const [name, setName] = useState(currentPartner ? currentPartner.name : "");
    const [address, setAddress] = useState(currentPartner ? currentPartner.address : "");
    const [max_payment_limit, setLimit] = useState(currentPartner ? currentPartner.max_payment_limit : "")
    const [username, setUsername] = useState(currentPartner ? currentPartner.username : "");

    const header = [
        { name: "Mã công ty", field: "code", sortable: true },
        { name: "Tên công ty", field: "name", sortable: true },
        { name: "", sortable: false }
    ];

    const onToggleAdd = () => {
        setAddModal(!addModal);
    }

    function onChangeValue(content, type) {
        switch (type) {
            case "code":
                return setCode(content);
            case "taxId":
                return setTaxId(content);
            case "name":
                return setName(content);
            case "address":
                return setAddress(content);
            case "max_payment_limit":
                return setLimit(content);
            case "username":
                return setUsername(content);
        }
    }

    async function onAdd() {
        console.log(name, code, taxId, address, max_payment_limit, username);
        await axios.post("http://localhost:6060/createClient", {
          code: code ? code: null,
          name: name ? name : null,
          taxId: taxId ? taxId : null,
          address: address ? address : null,
          username: username ? username : null,
          max_payment_limit: max_payment_limit ? max_payment_limit : null,
          password: "12345678",
          roleId: "3",
        }).then(res => {
          console.log(res);
          console.log(res.data);
        })
    }

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
                <button className="admin-add-button" onClick={() => onToggleAdd()}>
                    Thêm đối tác
                </button>
                <Search onSearch={(value) => {
                    setSearch(value);
                    setCurrentPage(1);
                }}
                />
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
            <ModalEdit
                modal={addModal}
                toggle={onToggleAdd}
                onSubmit={onAdd}
                title={"Thêm đối tác"}
            >
                <Table>
                    <tr>
                        <th>
                            Mã đối tác
                        </th>
                        <td>
                            <input
                                defaultValue={""}
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
                                defaultValue={""}
                                onChange={(event) => onChangeValue(event.target.value, "name")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Mã số thuế
                        </th>
                        <td>
                            <input
                                defaultValue={""}
                                onChange={(event) => onChangeValue(event.target.value, "taxId")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Địa chỉ
                        </th>
                        <td>
                            <input
                                defaultValue={""}
                                onChange={(event) => onChangeValue(event.target.value, "address")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Hạn mức công nợ
                        </th>
                        <td>
                            <input
                                defaultValue={""}
                                onChange={(event) => onChangeValue(event.target.value, "max_payment_limit")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Tên đăng nhập
                        </th>
                        <td>
                            <input
                                defaultValue={""}
                                onChange={(event) => onChangeValue(event.target.value, "username")}
                            />
                        </td>
                    </tr>
                </Table>
            </ModalEdit>
            <Switch>
            <Route path="/admin/partner/:clientId" component={AdminPartnerMain} />
            </Switch>
        </div>
    )
}
