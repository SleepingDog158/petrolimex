import React, { useState, useMemo, useEffect } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import { TableHeaderAdmin } from './TableHeaderAdmin'
import ModalEdit from './ModalAdmin'
import { toast } from 'react-toastify'

export const ProductAdmin = () => {

    const [products, setProduct] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [code, setCode] = useState(currentProduct ? currentProduct.code : "");
    const [name, setName] = useState(currentProduct ? currentProduct.name : "");
    const [unit, setUnit] = useState(currentProduct ? currentProduct.unit : "");
    const [price, setPrice] = useState(currentProduct ? currentProduct.price : "");
    const [modal, setModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [sorting, setSorting] = useState("");

    const header = [
        { name: "Mã sản phẩm", field: "code", sortable: true },
        { name: "Tên sản phẩm", field: "name", sortable: true },
        { name: "Đơn vị", field: "unit", sortable: false },
        { name: "Giá (VND)", field: "price", sortable: true },
        { name: "", sortable: false }
    ];

    const toggle = (product) => {
        setModal(!modal);
        if (!modal) {
            setCurrentProduct(product);
            setCode(product.code);
            setName(product.name);
            setUnit(product.unit);
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
            case "unit":
                return setUnit(content);
            case "price":
                return setPrice(content);
        }
    }

    function onAdd() {
        console.log(code, name, unit, price);
        toast.success("Đã thêm thông tin sản phẩm!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true
        });
    }

    function onUpdate() {
        console.log(code, name, unit, price);
        toast.info("Thay đổi thông tin thành công!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true
        });
    }

    function onRemove(product) {
        setProduct(products.filter((p) => currentProduct.code !== p.code));
        toast.error("Đã xóa thông tin sản phẩm!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true
        });
        console.log(products);
    }

    useEffect(async () => {
        const result = await axios.post("http://localhost:6060/getProducts/", {});
        console.log(result.data.products);
        setProduct(result.data.products);
    }, []);

    const productData = useMemo(() => {
        let processedProduct = products;
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            processedProduct = processedProduct.sort(
                (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        return processedProduct.slice();
    }, [products, sorting]);

    return (
        <div>
            <div>
                <button className="admin-add-button" onClick={() => onToggleAdd()}>
                    Thêm sản phẩm
                </button>
            </div>
            <Table striped>
                <TableHeaderAdmin
                    header={header}
                    onSorting={(field, order) => setSorting({ field, order })}
                />
                <tbody>
                    {productData.map((product, i) => (
                        <tr key={i}>
                            <td style={{textAlign: "center", verticalAlign: "middle", width: "125px"}}>
                                {product.code}
                            </td>
                            <td style={{verticalAlign: "middle", width: "250px"}}>
                                {product.name}
                            </td>
                            <td style={{textAlign: "center", verticalAlign: "middle", width: "80px"}}>
                                {product.unit}
                            </td>
                            <td style={{textAlign: "center", verticalAlign: "middle", width: "100px"}}>
                                {product.price}
                            </td>
                            <td style={{width: "150px", textAlign: "right"}}>
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
            <ModalEdit
                modal={modal}
                toggle={toggle}
                onSubmit={onUpdate}
                title={"Thông tin sản phẩm"}
            >
                <Table>
                    <tr>
                        <th>
                            Mã sản phẩm
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
                            Tên sản phẩm
                        </th>
                        <td>
                            <input
                                defaultValue={name}
                                onChange={(event) => onChangeValue(event.target.value, "name")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Đơn vị
                        </th>
                        <td>
                            <input
                                defaultValue={unit}
                                onChange={(event) => onChangeValue(event.target.value, "unit")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Giá
                        </th>
                        <td>
                            <input
                                defaultValue={price}
                                onChange={(event) => onChangeValue(event.target.value, "price")}
                            />
                        </td>
                    </tr>
                </Table>
            </ModalEdit>
            <ModalEdit
                modal={addModal}
                toggle={onToggleAdd}
                onSubmit={onAdd}
                title={"Thêm sản phẩm"}
            >
                <Table>
                    <tr>
                        <th>
                            Tên sản phẩm
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
                            Đơn vị
                        </th>
                        <td>
                            <input
                                defaultValue={""}
                                onChange={(event) => onChangeValue(event.target.value, "unit")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Giá
                        </th>
                        <td>
                            <input
                                defaultValue={""}
                                onChange={(event) => onChangeValue(event.target.value, "price")}
                            />
                        </td>
                    </tr>
                </Table>
            </ModalEdit>
            <ModalEdit
                modal={deleteModal}
                toggle={onToggleDelete}
                onSubmit={onRemove}
                title={"Xóa sản phẩm"}
            >
                <p>
                    Xóa thông tin sản phẩm?
                </p>
            </ModalEdit>
        </div>
    )
}
