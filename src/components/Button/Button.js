import React from "react";
import styles from "./Button.module.css";

const Button = ({ loadMore }) => {
  return (
    <button id="scrollHeight" className={styles.Button} onClick={loadMore}>
      Load More
    </button>
  );
};

export default Button;
