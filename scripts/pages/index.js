async function getPhotographers() {
  try {
    const responseJSON = await fetch("../../data/photographers.json");
    // Code a exectué après reception de la réponse
    // Conversion de la réponse au format javascript
    const responseJS = await responseJSON.json();
    // let photographers = responseJS.photographers;

    console.log(responseJS, "objet javascript");

    // main.innerHTML = `<h1> ${responseJS.photographers[0].portrait} <br>${responseJS.photographers[0].city} - ${responseJS.photographers[0].name}</h1>`;
  } catch (error) {
    console.log(error, "erreur");
  }

  // et bien retourner le tableau photographers seulement une fois récupéré
  return {
    photographers: [...photographers, ...photographers, ...photographers],
  };
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
