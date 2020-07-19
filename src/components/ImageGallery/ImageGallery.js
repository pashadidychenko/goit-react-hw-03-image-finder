import React from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import styles from "./ImageGallery.module.css";
import PropTypes from "prop-types";

const ImageGallery = ({ imageData, showModal }) => {
  return (
    <ul className={styles.ImageGallery}>
      {imageData.map((data) => (
        <ImageGalleryItem
          dataUrlWeb={data.webformatURL}
          dataUrlLarge={data.largeImageURL}
          showModal={showModal}
          key={data.id}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  imageData: PropTypes.array,
};
