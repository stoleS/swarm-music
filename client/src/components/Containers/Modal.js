import React from "react";

const Modal = ({ open, children }) => {
  const showModal = open ? "block" : "none";
  return (
    <div style={{ display: showModal }} id="myModal" className="modal">
      <div className="modal-content" id="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
