var API_KEY = '42113152-8e32ae93f4bbd907c64935223';
const API_URL = `https://pixabay.com/api/?key=${API_KEY}&per_page=10`;

let currentPage = 1;
let currentQuery = '';
let currentColor = '';


function fetchImages() {
  let url = `${API_URL}&page=${currentPage}`;

  if (currentQuery) {
    url += `&q=${encodeURIComponent(currentQuery)}`;
  }

  if (currentColor) {
    url += `&colors=${currentColor}`;
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayImages(data.hits);
    })
    .catch(error => console.error('Error fetching images:', error));
}


function displayImages(images) {
  const imageGrid = document.getElementById('image-grid');
  imageGrid.innerHTML = '';

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
  


document.getElementById('nextButton').addEventListener('click', () => {
  currentPage++;
  fetchImages();
});


fetchImages();