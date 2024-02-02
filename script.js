var API_KEY = '42113152-8e32ae93f4bbd907c64935223';
	var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
	$.getJSON(URL, function(data){
	if (parseInt(data.totalHits) > 0)
	    $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
	else
	    console.log('No hits');
	});
    function fetchImage() {
        const apiKey = '42113152-8e32ae93f4bbd907c64935223';
        fetch('https://pixabay.com/api/?key=s', {
          method: 'GET',
          headers: {
            'x-rapidapi-key': apiKey,
            "x-rapidapi-host": "https://pixabay.com/"
          }
        })
        .then((response) => response.blob())
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob);
          const imageElement = document.createElement("img");
          imageElement.src = imageUrl;
          const container = document.getElementById("image-container");
          container.appendChild(imageElement);
        });
      }