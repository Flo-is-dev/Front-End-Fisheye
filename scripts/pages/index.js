async function getPhotographers() {
  try {
    const responseJSON = await fetch("../../data/photographers.json");
    // Code a exectué après reception de la réponse
    // Conversion de la réponse au format javascript
    const responseJS = await responseJSON.json();

    return responseJS;
  } catch (error) {
    console.log(error, "erreur");
  }

  // et bien retourner le tableau photographers seulement une fois récupéré
  return {};
}

// Création d'une fonction displayPhotographer(responseJS) qui utilise le responseJS obtenu via le fetch

const displayPhotographer = (responseJS) => {
  console.log(responseJS.photographers);

  for (let i = 0; i <= responseJS.photographers.length - 1; i++) {
    let name = responseJS.photographers[i].name;

    // Fonction pour mettre le nom des photographes au bon format pour l'appel d'image (avec destructuring)
    const joinName = (str) => {
      let newName = str.replaceAll("-", "").split(" ");

      let [n, p] = newName;
      return [...n].join("") + [...p].join("");
    };

    let namePhotographe = joinName(name);
    console.log(namePhotographe);

    const photographerSection = document.querySelector(".photographer_section");

    photographerSection.innerHTML += /*html*/ `
          <article aria-describedby="carte du photographe ${responseJS.photographers[i].name}">
              <a href="./photographer.html?id=${responseJS.photographers[i].id}" role="link" aria-label="Voir le profil de ${responseJS.photographers[i].name}">
                  <img src="./assets/photographers/Photographers-ID-Photos/${namePhotographe}.jpg"  alt="photo de ${responseJS.photographers[i].name}">
                  <h2>${responseJS.photographers[i].name}</h2>
              </a>
              <h3>${responseJS.photographers[i].city},${responseJS.photographers[i].country}</h3>
              <p>${responseJS.photographers[i].tagline}</p>
              <h4>${responseJS.photographers[i].price}€/jour</h4>
          </article>`;
  }
};

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
  const responseJS = await getPhotographers();

  displayPhotographer(responseJS);
}

init();
