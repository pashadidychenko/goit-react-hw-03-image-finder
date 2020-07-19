import axios from "axios";
const REQUEST_URL = "https://pixabay.com/api/";
const API_KEY = "16131668-a6b5f889764d48a111b29e31c";

const getImageList = (searchText, currentPage) => {
  return axios
    .get(
      `${REQUEST_URL}?image_type=photo&orientation=horizontal&q=${searchText}&page=${currentPage}&per_page=12&key=${API_KEY}`
    )
    .then((response) => response.data.hits);
};

export default {
  getImageList,
};
