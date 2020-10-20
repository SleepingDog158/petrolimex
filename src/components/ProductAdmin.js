import React, { useState, useMemo, useEffect, Component } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import { TableHeaderAdmin } from './TableHeaderAdmin'
import ModalEdit from './ModalAdmin'
import { toast } from 'react-toastify';

export const ProductAdmin = () => {

    const [products, setProduct] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [code, setCode] = useState(currentProduct ? currentProduct.code : "");
    const [name, setName] = useState(currentProduct ? currentProduct.name : "");
    const [price, setPrice] = useState(currentProduct ? currentProduct.price : "");
    const [modal, setModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [sorting, setSorting] = useState("");

    const header = [
        { name: "Mã sản phẩm", field: "code", sortable: true },
        { name: "Tên sản phẩm", field: "name", sortable: true },
        { name: "Giá", field: "price", sortable: true },
        { name: "", sortable: false }
    ];

    const toggle = (product) => {
        setModal(!modal);
        if (!modal) {
            setCurrentProduct(product);
            setCode(product.code);
            setName(product.name);
            setPrice(product.price);
        }
    };

    const onToggleAdd = () => {
        setAddModal(!addModal);
    };

    const onToggleDelete = (product) => {
        setDeleteModal(!deleteModal);
        if (!modal) {
            setCurrentProduct(product);
        }
    };

    function onChangeValue(content, type) {
        switch (type) {
            case "code":
                return setCode(content);
            case "name":
                return setName(content);
            case "price":
                return setPrice(content);
        }
    }

    function onAdd() {
        console.log(code, name, price);
        toast.success("Đã thêm thông tin sản phẩm!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000, hideProgressBar: true });
    }

    function onUpdate() {
        console.log(code, name, price);
        toast.info("Thay đổi thông tin thành công!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000, hideProgressBar: true });
    }

    function onRemove(product) {
        setProduct(products.filter((p) => currentProduct.code !== p.code));
        toast.error("Đã xóa thông tin sản phẩm!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000, hideProgressBar: true });
        console.log(products);
    }

    useEffect(async() => {
        const result = await axios.get("https://localhost:6060/product");
        console.log(result.data);
        setProduct(result.data);
    }, []);

    const productData = useMemo(() => {
        let processProduct = products;
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            processProduct = processProduct.sort(
                (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        return processProduct.slice();
    }, [products, sorting]);

    return (
        <div>
            <div>
                <div>
                    <div>
                        <button className="admin-add-button" onClick = {() => onToggleAdd()}>
                            Thêm sản phẩm
                        </button>
                    </div>
                    <Table striped>
                        <TableHeaderAdmin
                            header={header}
                            onSorting={(field, order) => setSorting({ field, order })}
                        />
                        <tbody>
                            {productData.map((product) => (
                                <tr>
                                    <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                        {product.code}
                                    </td>
                                    <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                        {product.name}
                                    </td>
                                    <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                        {product.price}
                                    </td>
                                    <td>
                                        <button className="admin-edit-button" onClick={() => toggle(product)}>
                                            Sửa
                                        </button>
                                        <button className="admin-delete-button" onClick={() => onToggleDelete(product)}>
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <ModalEdit modal={modal} toggle={toggle} onSubmit={onUpdate} title={"Thông tin sản phẩm"}>
                        <Table>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <td>
                                <input
                                    defaultValue={name}
                                    onChange={(event) => onChangeValue(event.target.value, "name")}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Giá</th>
                            <td>
                                <input
                                    defaultValue={price}
                                    onChange={(event) => onChangeValue(event.target.value, "price")}
                                />
                            </td>
                        </tr>
                        </Table>
                    </ModalEdit>
                    <ModalEdit modal={addModal} toggle={onToggleAdd} onSubmit={onAdd} title={"Thêm sản phẩm"}>
                        <Table>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <td>
                                    <input
                                        defaultValue={""}
                                        onChange={(event) => onChangeValue(event.target.value, "name")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Giá</th>
                                <td>
                                    <input
                                        defaultValue={""}
                                        onChange={(event) => onChangeValue(event.target.value, "price")}
                                    />
                                </td>
                            </tr>
                        </Table>
                    </ModalEdit>
                    <ModalEdit modal={deleteModal} toggle={onToggleDelete} onSubmit={onRemove} title={"Xóa sản phẩm"}>
                        <p>Xóa thông tin sản phẩm?</p>
                    </ModalEdit>
                </div>
            </div>
        </div>
    )
}
