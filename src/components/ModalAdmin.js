import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Admin.css'

const ModalEdit = (prop) => {
    const { className, modal, toggle, onSubmit, title } = prop;

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggl ={toggle}>
                    {title}
                </ModalHeader>
                <ModalBody>
                    {prop.children}
                </ModalBody>
                <ModalFooter>
                    <button className="modal-confirm-button" onClick = {() => {toggle(); onSubmit()}}>
                        Xác nhận
                    </button>
                    {' '}
                    <button className="modal-cancel-button" onClick = {toggle}>
                        Hủy
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ModalEdit;