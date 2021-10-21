const elInputSearch = document.querySelector(".films__input-search");
const elFilmsList = document.querySelector(".films__list");
const elPrevButton = document.querySelector(".films__prev-button");
const elNextButton = document.querySelector(".films__next-button");
const elTemplateFilm = document.querySelector(".film__template").content;

const API_KEY = "6556da72";
let search = "hulk";
let page = 1;

function renderMovies(arr, node) {
  node.innerHTML = null;

  const filmsFragment = document.createDocumentFragment();

  arr.forEach((row) => {
    const clonedFilmTemplate = elTemplateFilm.cloneNode(true);

    clonedFilmTemplate.querySelector(".film__poster").src = row.Poster;
    clonedFilmTemplate.querySelector(".film__title").textContent = row.Title;
    clonedFilmTemplate.querySelector(".film__year").textContent = row.Year;
    clonedFilmTemplate.querySelector(".film__type").textContent = row.Type;
    clonedFilmTemplate.querySelector(".film__id").textContent = row.imdbID;

    filmsFragment.appendChild(clonedFilmTemplate);
  });

  node.appendChild(filmsFragment);
}

async function getMovies() {
  const res = await fetch(
    "https://www.omdbapi.com/?apikey=" +
      API_KEY +
      "&s=" +
      search +
      "&page=" +
      page
  );

  const data = await res.json();

  if (data.Search.length > 0) {
    renderMovies(data.Search, elFilmsList);
  }

  if (page === 1) {
    elPrevButton.disabled = true;
  } else {
    elPrevButton.disabled = false;
  }

  const lastPage = Math.ceil(data.totalResults / 10);

  if (page === lastPage) {
    elNextButton.disabled = true;
  } else {
    elNextButton.disabled = false;
  }
}

elInputSearch.addEventListener("input", (evt) => {
  search = evt.target.value;
  getMovies();
});

elPrevButton.addEventListener("click", () => {
  page--;
  getMovies();
});
elNextButton.addEventListener("click", () => {
  page++;
  getMovies();
});
simpleslider.getSlider({
  container: document.getElementById("myslider"),
  transitionTime: 1,
  delay: 3.5,
  prop: "left",
});
getMovies();
