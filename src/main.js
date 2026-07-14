const API_KEY = import.meta.env.VITE_NASA_API_KEY;

function nasaAppInit() {
    const nasaApp = document.querySelector("#nasaApp");
    nasaApp.innerHTML = `<p class="nasa_loading">Loading...</p>`
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
        .then(response => {
            console.log(response.status);
            return response.json();
        })
        .then((data) => {
            let media;
            if (data.media_type === "image") {
                media = `<img class="nasa_image" src="${data.url}" alt="${data.title}">`;
            } else if (data.media_type === "video") {
                media = `<video class="nasa_video" src="${data.url}" controls></video>`;
            } else if (data.media_type === "youtube") {
                media = `<iframe class="nasa_youtube" width="560" height="315" src="${data.url}" allowfullscreen></iframe>`;
            }
            nasaApp.innerHTML = `
                <h2 class="nasa_title">${data.title}</h2>
                ${media}
                <p class="nasa_explanation">${data.explanation}</p>
            `;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            nasaApp.innerHTML = "<p>Error loading data. Please try again later.</p>";
        });
}

nasaAppInit();