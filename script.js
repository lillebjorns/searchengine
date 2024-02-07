var API_KEY = '42113152-8e32ae93f4bbd907c64935223';
const API_URL = `https://pixabay.com/api/?key=${API_KEY}&per_page=12`; // vi fick magistern använda 12 bilder för att vi användt grid

let currentPage = 1;
let currentQuery = '';
let currentColor = '';
let selectedColor = ''; //ny variabel som får spara undan färgen tillsvidare
prevButton.disabled = true;
nextButton.disabled = true;


async function fetchImages() {
  let url = `${API_URL}&page=${currentPage}`;

  if (currentQuery) {
    url += `&q=${encodeURIComponent(currentQuery)}`;
  }

  if (currentColor) {
    url += `&colors=${currentColor}`; //currentcolor är tom tills submit trycks på
  }

  const response = await fetch(url);
  const data = await response.json();
  totalPages = Math.max(1, data.totalHits / 12);
  displayImages(data.hits);
  updateNavigationButtons();

}

function displayImages(images) {
  const imageGrid = document.getElementById('image-grid');
  const fragment = document.createDocumentFragment();

  while (imageGrid.firstChild) {
    imageGrid.removeChild(imageGrid.firstChild); // utan detta är första platsen i gridet tom
  }

  images.forEach(image => {
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('image');


    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL; //bild
    imgElement.alt = image.tags; //taggar
    imgElement.classList.add('image'); //klass för styling


    const tagsElement = document.createElement('p');
    tagsElement.classList.add('image-tags'); //klass för styling
    tagsElement.textContent = image.tags;


    const userElement = document.createElement('p');
    userElement.classList.add('image-user'); //klass för styling
    userElement.textContent = `Taken by: ${image.user} `;


    imgContainer.appendChild(imgElement); //pusselbit 1
    imgContainer.appendChild(tagsElement);//pusselbit 2
    imgContainer.appendChild(userElement);//pusselbit 3


    fragment.appendChild(imgContainer); //komplett pussel
  });

  imageGrid.appendChild(fragment); //in med det på sidan


  document.querySelectorAll('.dropdown-content a').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
      event.preventDefault(); //tydligen bra att ha med

      const color = this.textContent.trim().toLowerCase(); //norpar färgen från vald dropdown
      document.querySelector('.dropbtn').textContent = `${color}`;
    });
  });


}
function updateNavigationButtons() {
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');


  if (currentPage === 1) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }

  if (currentPage >= totalPages) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
}

document.getElementById('searchForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  currentQuery = document.getElementById('searchInput').value;

  currentColor = selectedColor;  // !!!först vid submit så sparas färgen i currentColor!!!

  currentPage = 1;
  await fetchImages();
});

document.querySelectorAll('.dropdown-content a').forEach(anchor => {
  anchor.addEventListener('click', function (event) {
    event.preventDefault();

    selectedColor = this.dataset.color || this.textContent.trim().toLowerCase();
    document.querySelector('.dropbtn').textContent = selectedColor;
  });
});

document.getElementById('nextButton').addEventListener('click', () => {

  currentPage++;
  fetchImages();
});


document.getElementById('prevButton').addEventListener('click', () => {

  currentPage--;
  fetchImages();
});

