import React, { useState, useMemo, useEffect, Component } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import { TableHeaderAdmin } from './TableHeaderAdmin'
import ModalEdit from './ModalAdmin'
import { toast } from 'react-toastify';

export const ProductAdmin = () => {

    const [products, setProduct] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [product_id, setId] = useState(currentProduct ? currentProduct.product_id : "");
    const [product_name, setName] = useState(currentProduct ? currentProduct.product_name : "");
    const [product_price, setPrice] = useState(currentProduct ? currentProduct.product_price : "");
    const [modal, setModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [sorting, setSorting] = useState("");

    const header = [
        { name: "Mã sản phẩm", field: "product_id", sortable: true },
        { name: "Tên sản phẩm", field: "product_name", sortable: true },
        { name: "Giá", field: "product_price", sortable: true },
        { name: "", sortable: false }
    ];

    const toggle = (product) => {
        setModal(!modal);
        if (!modal) {
            setCurrentProduct(product);
            setId(product.product_id);
            setName(product.product_name);
            setPrice(product.product_price)
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
            case "product_id":
                return setId(content);
            case "product_name":
                return setName(content);
            case "product_price":
                return setPrice(content);
        }
    }

    function onAdd() {
        console.log(product_id, product_name, product_price);
        toast.success("Đã thêm thông tin sản phẩm!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000, hideProgressBar: true });
    }

    function onUpdate() {
        console.log(product_id, product_name, product_price);
        toast.info("Thay đổi thông tin thành công!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000, hideProgressBar: true });
    }

    function onRemove(product) {
        setProduct(products.filter((p) => currentProduct.product_id !== p.product_id));
        toast.error("Đã xóa thông tin sản phẩm!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000, hideProgressBar: true });
        console.log(products);
    }

    useEffect(async() => {
        const result = await axios.get("https://tnzio.sse.codesandbox.io/product");
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
                                        {product.product_id}
                                    </td>
                                    <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                        {product.product_name}
                                    </td>
                                    <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                        {product.product_price}
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
                                    defaultValue={product_name}
                                    onChange={(event) => onChangeValue(event.target.value, "product_name")}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Giá</th>
                            <td>
                                <input
                                    defaultValue={product_price}
                                    onChange={(event) => onChangeValue(event.target.value, "product_price")}
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
                                        onChange={(event) => onChangeValue(event.target.value, "product_name")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Giá</th>
                                <td>
                                    <input
                                        defaultValue={""}
                                        onChange={(event) => onChangeValue(event.target.value, "product_price")}
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
