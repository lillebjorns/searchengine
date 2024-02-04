var API_KEY = '42113152-8e32ae93f4bbd907c64935223';
const API_URL = `https://pixabay.com/api/?key=${API_KEY}&per_page=10`;

let currentPage = 1;
let currentQuery = '';
let currentColor = '';


async function fetchImages() {
  let url = `${API_URL}&page=${currentPage}`;

  if (currentQuery) {
    url += `&q=${encodeURIComponent(currentQuery)}`;
  }

  if (currentColor) {
    url += `&colors=${currentColor}`;
  }
    const response = await fetch(url);
    const data = await response.json();
    displayImages(data.hits);
   
}


function displayImages(images) {
  const imageGrid = document.getElementById('image-grid');
  const fragment = document.createDocumentFragment(); // Create a document fragment

  // Clear the existing content of imageGrid
  while (imageGrid.firstChild) {
    imageGrid.removeChild(imageGrid.firstChild);
  }

  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;
    imgElement.alt = image.tags;
    imgElement.classList.add('image');
    imageGrid.appendChild(imgElement);
  });
}


document.getElementById('searchForm').addEventListener('submit', (event) => {
    event.preventDefault(); 
    currentQuery = document.getElementById('searchInput').value;
    fetchImages();
});


document.querySelectorAll('.dropdown-content a').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
      event.preventDefault(); 
  
      
      const color = this.dataset.color || this.textContent.trim().toLowerCase();
  
     
      filterImagesByColor(color);
    });
  });
  function filterImagesByColor(color) {
    // You would implement the logic here to filter images based on the selected color
    // For example, you might hide images that do not match the selected color

    const images = document.querySelectorAll('.image');
    images.forEach(image => {
        const imageColor = getImageColor(image); // You need to define a function to get the color of the image
        if (imageColor !== color) {
            image.style.display = 'none'; // Hide images that do not match the selected color
        } else {
            image.style.display = 'block'; // Show images that match the selected color
        }
    });
}


document.getElementById('nextButton').addEventListener('click', () => {
  currentPage++;
  fetchImages();
});


fetchImages();