//Mettre le code JavaScript lié à la page photographer.html

// *----Récupération de l'ID ciblé

const urlSearchParams = new URLSearchParams(window.location.search);

const param = urlSearchParams.get("id");
console.log("l'id est", param);

// Localiser à l'objet window

async function getPhotographers() {
  try {
    const responseJSON = await fetch("../../data/photographers.json");
    // Code a exectué après reception de la réponse
    // Conversion de la réponse au format javascript
    const responseJS = await responseJSON.json();
    // !let photographers = responseJS.photographers;

    // Je crée un tableau vide qui va accueillir les 6 IDs grace à la boucle for
    let IdPhotoTab = [];

    // ----Boucle for qui parcour l'Objet responseJS.photographers
    for (let i = 0; i < responseJS.photographers.length; i++) {
      // J'ajoute les IDs à mon tableau
      IdPhotoTab.push(responseJS.photographers[i].id);
    }

    // Fonction qui retourn true si les valeurs (ID des photographes) sont égales à l'ID de l'URL
    const isCurrentID = (element) => {
      return element === Number(param);
    };

    console.log(isCurrentID());

    // FindIndex nous donnera l'index de l'élément correspondant dans le tableau IdPhotoTab, il vérifie pour chaque i si c'est false ou true grace à la fonction isCurrentId
    let currentIdIndex = IdPhotoTab.findIndex(isCurrentID);

    console.log(IdPhotoTab);
    console.log(currentIdIndex);

    // Fonction de nom
    let name = responseJS.photographers[currentIdIndex].name;

    // Fonction pour mettre le nom des photographes au bon format (txt collé) pour l'appel d'image
    const joinName = (str) => {
      let newName = str.replaceAll("-", "").split(" ");
      console.log(newName);
      let [n, p] = newName;
      return [...n].join("") + [...p].join("");
    };

    let namePhotographe = joinName(name);

    // On injecte le html en fonction du photographe

    const photographHeader = document.querySelector(".photograph-header");
    photographHeader.innerHTML += /*html*/ `<div class="photograph-header-info">
    <h1>${responseJS.photographers[currentIdIndex].name}</h1>
    <h3>${responseJS.photographers[currentIdIndex].city},${responseJS.photographers[currentIdIndex].country}</h3>
    <p>${responseJS.photographers[currentIdIndex].tagline}</p>
    </div>
    <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
    <img src="./assets/photographers/Photographers ID Photos/${namePhotographe}.jpg" alt="photo de ${responseJS.photographers[currentIdIndex].name}">`;

    // ! 1) injection des photo de la page photographer

    // TODO, créer un tableau dans le lequel on push tout les "media" avec le photographerId de la page. Puis on parcours ce tableau avec une boucle "for" dans laquelle on inject en innerHTML les images.

    console.log("l'id est", param);

    // Tableau qui va contenir tous les index des photo d'un photographe
    const photographerMedia = [];

    console.log(responseJS.media[0].photographerId);

    for (let i = 0; i < responseJS.media.length; i++) {
      if (responseJS.media[i].photographerId === Number(param)) {
        photographerMedia.push(responseJS.media[i]);
      }
    }
    // TODO Essayer d'utiliser filter

    console.log(photographerMedia);

    // Parcour pour atteindre les fichier photographeq ue je vais injecter
    console.log(responseJS.photographers[currentIdIndex].name);

    const photoContainer = document.querySelector(".photo-container");

    // inject avec for photographerMedia[i]
    for (let i = 0; i < photographerMedia.length; i++) {
      // Pour gérer le cas de jpg ou video je passe par une variable intermédiaire et on vérifie si elle est undifined,

      let mediaFormat = photographerMedia[i].image;

      if (!mediaFormat) {
        let mediaFormat = photographerMedia[i].video;
        console.log(mediaFormat, "c'est pas une photo");

        photoContainer.innerHTML += /*html*/ `
        <div class="photo-container-card">
        <video controls width="100%">
        <source src="../../assets/photographers/${
          responseJS.photographers[currentIdIndex].name.split(" ")[0]
        }/${mediaFormat}" type="video/webm" />
         Download the
         <a href="/media/cc0-videos/flower.webm">WEBM</a>
         video.
        </video>
          <div class="photo-card-info">
          <p>${photographerMedia[i].title}</p> <span>${
          photographerMedia[i].likes
        }<i class="fa-solid fa-heart"></i></span>
         </div>
        </div>
      `;
      } else {
        photoContainer.innerHTML += /*html*/ `
        <div class="photo-container-card">
         <img src="../../assets/photographers/${
           responseJS.photographers[currentIdIndex].name.split(" ")[0]
         }/${photographerMedia[i].image}" alt="photo nommée ${
          photographerMedia[i].title
        }" />
          <div class="photo-card-info">
          <p>${photographerMedia[i].title}</p> <span>${
          photographerMedia[i].likes
        }<i class="fa-solid fa-heart"></i></span>
         </div>
        </div>
      `;
      }
    }

    // ! 2) injection des likes

    // TODO, grace au tableau du dessus, additionner tous les likes dans une constante qu'on va innerHTML dans la like-card

    //  ! 3) modal inscription à mettre en absolute et en dynamique

    // !4) Tri activable
  } catch (error) {
    console.log(error, "erreur");
  }

  // et bien retourner le tableau photographers seulement une fois récupéré
  //!   return {
  //     photographers: responseJS.photographers,
  //   };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();

// -------------------------------------------------
// -------MODAL D'INSCRIPTION
// -------------------------------------------------
