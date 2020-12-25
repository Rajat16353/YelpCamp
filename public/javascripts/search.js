const { searchCampground } = require("../../controllers/campgrounds");

const searchText = document.getElementById("searchBar");

searchText.addEventListener("change", () => {
    console.log(searchText);
})