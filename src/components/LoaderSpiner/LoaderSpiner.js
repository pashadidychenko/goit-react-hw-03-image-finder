import React from "react";
import Loader from "react-loader-spinner";

const LoaderSpiner = () => {
  return (
    <Loader
      type="Bars"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={9000}
    />
  );
};

export default LoaderSpiner;
