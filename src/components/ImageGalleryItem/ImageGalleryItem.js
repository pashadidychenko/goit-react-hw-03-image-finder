import React from "react";
import styles from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ dataUrlWeb, dataUrlLarge, showModal }) => {
  return (
    <li
      className={styles.ImageGalleryItem}
      onClick={() => showModal(dataUrlLarge)}
    >
      <img src={dataUrlWeb} alt="" className={styles.ImageGalleryItemImage} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  dataUrlWeb: PropTypes.string,
  dataUrlLarge: PropTypes.string,
};
