import React from "react";
import styles from "./Searchbar.module.css";

class Searchbar extends React.Component {
  state = {
    searchText: "",
  };

  inputVlue = (el) => {
    let textValue = el.target.value;
    this.setState({ searchText: textValue });
  };

  searchText = (el) => {
    el.preventDefault();
    this.props.searchText(this.state.searchText);
    this.setState({ searchText: "" });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.searchText}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormBbuttonLabel}>Search</span>
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchText}
            onChange={this.inputVlue}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
