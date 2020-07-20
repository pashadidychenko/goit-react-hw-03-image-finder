import React from "react";
import Api from "./components/Services/Api";
import Searchbar from "./components/Searchbar/Searchbar";
import LoaderSpiner from "./components/LoaderSpiner/LoaderSpiner";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ModalWindow from "./components/Modal/Modal";
import Button from "./components/Button/Button";
import PropTypes from "prop-types";
import styles from "./App.module.css";

class App extends React.Component {
  state = {
    searchQuery: "",
    imageData: [],
    isLoading: false,
    showModalStatus: false,
    largeImage: "",
    currentPage: 1,
    loadMoreStatus: false,
  };

  componentDidMount() {
    document.addEventListener("keydown", this.closeModal, false);
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, currentPage } = this.state;
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.addData(searchQuery, currentPage);
    }
    if (prevState.imageData.length !== this.state.imageData.length) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.closeModal, false);
  }

  addData = (searchQuery, currentPage) => {
    this.setState({ isLoading: true });
    Api.getImageList(searchQuery, currentPage)
      .then((imageData) =>
        this.setState((prevState) => {
          if (imageData.length !== 0) {
            return {
              imageData: prevState.imageData.concat(imageData),
              loadMoreStatus: true,
            };
          } else {
            return { loadMoreStatus: false };
          }
        })
      )
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  searchText = (inputText) => {
    this.setState({
      searchQuery: inputText,
      currentPage: 1,
      imageData: [],
      loadMore: true,
    });
  };

  showModal = (dataUrlLarge) => {
    this.setState({ showModalStatus: true, largeImage: dataUrlLarge });
  };

  closeModal = (e) => {
    if (e.keyCode === 27 || e.target.tagName === "DIV") {
      this.setState({ showModalStatus: false, largeImage: "" });
    } else return;
  };

  loadMore = () => {
    this.setState((prevState) => {
      if (this.state.imageData.length % 12 !== 0) {
        return { loadMoreStatus: false };
      } else return { currentPage: prevState.currentPage + 1 };
    });
  };

  render() {
    const {
      isLoading,
      imageData,
      largeImage,
      showModalStatus,
      loadMoreStatus,
    } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar searchText={this.searchText} />
        {isLoading ? <LoaderSpiner /> : null}
        <ImageGallery imageData={imageData} showModal={this.showModal} />
        {showModalStatus && (
          <ModalWindow dataUrlLarge={largeImage} closeModal={this.closeModal} />
        )}
        {loadMoreStatus && <Button loadMore={this.loadMore} />}
      </div>
    );
  }
}

export default App;

App.propTypes = {
  inputText: PropTypes.string,
  imageData: PropTypes.array,
};
