const baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
const api_key = "iZZgEX5HgpzS4bZUvMwf9yfHsbzqh4J8VtHuJxHo";
let arrMarsPics = [];
const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let roverInput = document.getElementById("roverInput").value.trim();
  let diaInput = document.getElementById("diaInput").value.trim();
  obtenerMarsPics(roverInput, api_key, diaInput);
});
const mostrarFotos = async (url) => {
  try {
    const marteFotos = document.getElementById("marteFotos");
    const results = await fetch(url);
    const response = await results.json();
    console.log(response.photos);
    arrMarsPics = response.photos;
    console.log(arrMarsPics);

    let html = "";

    if (arrMarsPics) {
        // const sal = arrMarsPics.map(({id}) => {
        //     return id
        //   })
        //   console.log(sal)
      arrMarsPics.forEach((element, i) => {
        html += `
      <div class="col-sm-1 col-md-6 col-lg-3 mx-auto">
        <div class="card mx-auto mt-5" data-id = "${element.id}">
          <img src="${element.img_src}" onclick="marsPicModal('${i}')" data-toggle="modal" data-target="#imgCard" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title fs-3 mb-3">Cámara: ${element.camera.full_name}</h5>
            <div class="dropdown-divider ms-3 me-3 "> </div>
            <h6 class="card-text fs-5">Fecha Tierra: ${element.earth_date}</h6>
          </div>
        </div>
      </div>
            `;

        });

    } 
    if (response.photos.length == 0) {
        html = '<div class="text-center"><h3>Lo siento, no hay información para ese día!<br> Probablemente la misión sea más corta.<h3></div>';
        marteFotos.classList.add('notFound');
    }
    
    marteFotos.innerHTML = html;
  } catch (err) {
    console.log(err);
  }
};

const obtenerMarsPics = async (roverInput, api_key, diaInput) => {
  const url = `${baseUrl}${roverInput}/photos/?api_key=${api_key}&sol=${diaInput}`;
  return mostrarFotos(url);
};

document.getElementById("roverInput").addEventListener("change", async (e) => {
    const roverSelected = e.target.value;
    console.log(roverSelected)
    if(roverSelected == 'Perseverance'){
        roverImagen = 'perseverance.gif';
        console.log(roverImagen);
    }else if (roverSelected == 'Curiosity'){
        roverImagen = 'curiosity.gif';
        console.log(roverImagen);
    }else if (roverSelected == 'Opportunity'){
        roverImagen = 'opportunity.gif';
        console.log(roverImagen);
    }else{
        roverImagen = 'spirit.jpg';
        console.log(roverImagen);
    }

    let roverInput = document.getElementById("roverInput").value.trim();
    const url = `${baseUrl}${roverInput}?api_key=${api_key}`;
    const results = await fetch(url);
    const response = await results.json();
    console.log(response.rover.cameras);

      const salida = response.rover.cameras.map(({name}) => {
        return `${name}`
      })

console.log(response.rover.cameras)
    document.getElementById("dataRoverPreview").innerHTML = `
    <div class="col-md-4 p-2 d-flex align-items-center">
          <img src="assets/img/${roverImagen}" class="img-fluid" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body p-2">
            <h5 class="card-title">${response.rover.name}</h5>
            <p class="card-text"><small>Fecha de aterrizaje: ${response.rover.landing_date}</small></p>
            <p class="card-text"><small>Fecha de lanzamiento: ${response.rover.launch_date}</small></p>
            <p class="card-text"><small>Estado actual: ${response.rover.status}</small></p>
            <p class="card-text">Maximo días sol: ${response.rover.max_sol}</p>
            <p class="card-text"><small>Total de fotos: ${response.rover.total_photos}</small></p>
            <p class="card-text"><small>Cámaras: ${salida.join(', ')}</small></p>
            </div>
        </div>
    `;
  });

  window.marsPicModal = (i) => {
    const fotoMarciana = arrMarsPics[i].img_src;
    const idPic = arrMarsPics[i].id;
    document.getElementsByClassName("modal-content")[0].innerHTML = `
    <div class="modal-header">
          <h5 class="modal-title">N° Identificación ${idPic}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <img src="${fotoMarciana}" class="d-block w-100" alt="marsPicture" />
        </div>
    `
  };
