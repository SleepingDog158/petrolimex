/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalEdit = (props) => {
  const {
    className,
    modal,
    toggle,
    onSubmit,
    title,
    showFooter = true,
  } = props;

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        {showFooter && (
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                toggle();
                onSubmit();
              }}
            >
              Xác nhận
            </Button>{" "}
            <Button color="danger" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        )}
      </Modal>
    </div>
  );
};

export default ModalEdit;
