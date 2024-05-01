const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");
const modalEl = document.getElementById("image-modal");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }

  const results = data.results;

  if (results.length === 0) {
    alert(`No Images available for ${searchInputEl.value}`);
    showMoreButtonEl.style.display = "none";
    return;
  }

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const saveButton = document.createElement("button");
    saveButton.textContent = "Preview or Save";
    saveButton.classList.add("save-button");

    saveButton.addEventListener("click", () => {
      const downloadLink = document.createElement("a");
      downloadLink.href = result.urls.raw;
      downloadLink.download = "image.jpg";
      downloadLink.click();
    });

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(saveButton);
    searchResultsEl.appendChild(imageWrapper);
  });

  addModalListeners();

  page++;

  if (page > 1) {
    showMoreButtonEl.style.display = "block";
  }
}

function openModal(imgUrl) {
  if (imgUrl) {
    const modalImg = document.getElementById("modal-img");
    modalImg.src = imgUrl;
    modalEl.style.display = "block";
    modalEl.classList.add("zoom-in");
  }
}

function closeModal() {
  modalEl.style.display = "none";
  modalEl.classList.remove("zoom-in");
}

const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", (event) => {
  if (event.target === modalEl) {
    closeModal();
  }
});

function addModalListeners() {
  const images = document.querySelectorAll(".search-result img");
  images.forEach((image) => {
    image.addEventListener("click", () => {
      openModal(image.src);
    });
  });
}

window.addEventListener("load", () => {
 
});

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
  showMoreButtonEl.style.display = "none";
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});