import React from "react";
import { Modal } from "react-bootstrap";

function CommonModal(props) {
  const { show, handleClose, title, children,className } = props;
  return (
    <Modal show={show} onHide={handleClose}>
     {title && <Modal.Header closeButton>
        <Modal.Title >{title}</Modal.Title>
      </Modal.Header>}
      <Modal.Body className={className}>{children}</Modal.Body>
    </Modal>
  );
}

export default CommonModal;
