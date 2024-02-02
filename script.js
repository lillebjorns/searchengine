var API_KEY = '42113152-8e32ae93f4bbd907c64935223';
	var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
	$.getJSON(URL, function(data){
	if (parseInt(data.totalHits) > 0)
	    $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
	else
	    console.log('No hits');
	});