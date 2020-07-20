import React from "react";
import styles from "./Searchbar.module.css";

class Searchbar extends React.Component {
  state = {
    searchQuery: "",
  };

  inputVlue = (el) => {
    let textValue = el.target.value;
    this.setState({ searchQuery: textValue });
  };

  addRequest = (el) => {
    el.preventDefault();
    this.props.searchText(this.state.searchQuery);
    this.setState({ searchQuery: "" });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.addRequest}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormBbuttonLabel}>Search</span>
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.inputVlue}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
