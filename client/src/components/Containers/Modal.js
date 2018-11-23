import React from "react";
import PropTypes from "prop-types";

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

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.element
};

Modal.defaultProps = {
  children: PropTypes.element
};
export default Modal;
