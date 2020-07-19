import React from "react";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";

const ModalWindow = ({ dataUrlLarge, closeModal }) => {
  return (
    <div className={styles.Overlay} onClick={closeModal}>
      <div className={styles.Modal}>
        <img src={dataUrlLarge} alt="" />
      </div>
    </div>
  );
};

export default ModalWindow;

ModalWindow.propTypes = {
  dataUrlLarge: PropTypes.string,
};
