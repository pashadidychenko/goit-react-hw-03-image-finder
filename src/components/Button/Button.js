import React from "react";
import styles from "./Button.module.css";

const Button = ({ loadMore }) => {
  return (
    <button className={styles.Button} onClick={loadMore}>
      Load More
    </button>
  );
};

export default Button;

// window.scrollTo({
//   top: document.documentElement.scrollHeight,
//   behavior: "smooth",
// });
