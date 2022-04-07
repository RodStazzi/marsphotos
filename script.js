const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
let api_key = "iZZgEX5HgpzS4bZUvMwf9yfHsbzqh4J8VtHuJxHo";

// event listeners
searchBtn.addEventListener('click', getMealList);

// get meal list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    let sunInputTxt = document.getElementById('sun-input').value.trim();

    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${sunInputTxt}/photos/?api_key=${api_key}&sol=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            
            if (data.photos) {

                data.photos.forEach(meal => {
                    html += `
                    <div class = "mars-item" data-id = "${meal.id}">
                        <div class = "mars-img">
                            <img src = "${meal.img_src}" class = "zoom" alt = "No Hay Imagen">
                        </div>
                        <div class = "mars-name">
                            <h5>Cámara: ${meal.camera.full_name}</h5>
                            <h5>Fecha Tierra: ${meal.earth_date}</h5>                          
                        </div>
                    </div>
                `;
                });

            } 
            if (data.photos.length == 0) {
                html = '<h3 style="font-weight: bold;">Lo siento, no tenemos información para ese día!<br> Probablemente la misión sea más corta.<h3>';
            }
    
            mealList.innerHTML = html;
        });
}
