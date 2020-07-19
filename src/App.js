import React from "react";
import Api from "./components/Services/Api";
import Searchbar from "./components/Searchbar/Searchbar";
import LoaderSpiner from "./components/LoaderSpiner/LoaderSpiner";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ModalWindow from "./components/Modal/Modal";
import styles from "./App.module.css";
import Button from "./components/Button/Button";
import PropTypes from "prop-types";

class App extends React.Component {
  state = {
    searchText: "",
    imageData: [],
    isLoading: false,
    showModal: false,
    largeImage: "",
    currentPage: 1,
    loadMore: false,
  };

  componentDidMount() {
    document.addEventListener("keydown", this.closeModal, false);
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchText, currentPage } = this.state;
    if (
      prevState.searchText !== this.state.searchText ||
      prevState.currentPage !== this.state.currentPage
    ) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
      return this.addData(searchText, currentPage);
    } else return;
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.closeModal, false);
  }

  addData = (searchText, currentPage) => {
    this.setState({ isLoading: true });
    Api.getImageList(searchText, currentPage)
      .then((imageData) =>
        this.setState((prevState) => {
          if (imageData.length !== 0) {
            return {
              imageData: prevState.imageData.concat(imageData),
              loadMore: true,
            };
          } else {
            return { loadMore: false };
          }
        })
      )
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  searchText = (inputText) => {
    this.setState({
      searchText: inputText,
      currentPage: 1,
      imageData: [],
      loadMore: true,
    });
  };

  showModal = (dataUrlLarge) => {
    this.setState({ showModal: true, largeImage: dataUrlLarge });
  };

  closeModal = (e) => {
    if (e.keyCode === 27 || e.target.tagName === "DIV") {
      this.setState({ showModal: false, largeImage: "" });
    } else return;
  };

  loadMore = () => {
    this.setState((prevState) => {
      if (this.state.imageData.length % 12 !== 0) {
        return { loadMore: false };
      } else return { currentPage: prevState.currentPage + 1 };
    });
  };

  render() {
    const {
      isLoading,
      imageData,
      largeImage,
      showModal,
      loadMore,
    } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar searchText={this.searchText} />
        {isLoading ? <LoaderSpiner /> : null}
        <ImageGallery imageData={imageData} showModal={this.showModal} />
        {showModal && (
          <ModalWindow dataUrlLarge={largeImage} closeModal={this.closeModal} />
        )}
        {loadMore && <Button loadMore={this.loadMore} />}
      </div>
    );
  }
}

export default App;

App.propTypes = {
  inputText: PropTypes.string,
  imageData: PropTypes.array,
};
