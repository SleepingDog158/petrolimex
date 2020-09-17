import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalEdit = (prop) => {
    const { className, modal, toggle, onSubmit, title } = prop;

    return (
        <div>
            <Modal isOpen = {modal} toggle = {toggle} className = {className}>
                <ModalHeader toggle = {toggle}></ModalHeader>
                <ModalBody>
                    {prop.children}
                </ModalBody>
                <ModalFooter>
                    <button onClick = {() => {toggle(); onSubmit()}}>Xác nhận</button>{' '}
                    <button onClick = {toggle}>Hủy</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}