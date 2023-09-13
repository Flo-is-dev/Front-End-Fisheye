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

    // Fonction qui retourn true si les valeurs sont égales
    const isCurrentID = (element) => {
      return element === Number(param);
    };

    // FindIndex nous donnera l'index de l'élément correspond
    let currentIdIndex = IdPhotoTab.findIndex(isCurrentID);

    console.log(IdPhotoTab);
    console.log(currentIdIndex);

    const main = document.getElementById("main");
    main.innerHTML = /*html*/ `<h2>${responseJS.photographers[currentIdIndex].name}</h2>`;
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
