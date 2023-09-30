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

    // ! OK------ 1) injection des photo de la page photographer

    // Tableau qui va contenir tous les index des photo d'un photographe
    const photographerMedia = [];

    // console.log(responseJS.media[0].photographerId);

    for (let i = 0; i < responseJS.media.length; i++) {
      if (responseJS.media[i].photographerId === Number(param)) {
        photographerMedia.push(responseJS.media[i]);
      }
    }

    console.log(photographerMedia);

    // Parcour pour atteindre les fichier photographe que je vais injecter
    console.log(responseJS.photographers[currentIdIndex].name);

    const photoContainer = document.querySelector(".photo-container");

    // inject avec for photographerMedia[i]
    const injectHtmlPhotographer = () => {
      for (let i = 0; i < photographerMedia.length; i++) {
        // Pour gérer le cas de jpg ou video je passe par une variable intermédiaire et on vérifie si elle est undifined,

        let mediaFormat = photographerMedia[i].image;

        //   Si c'est une vidéo on inject le code IF sinon img on injecte le ELSE
        if (!mediaFormat) {
          let mediaFormat = photographerMedia[i].video;
          console.log(mediaFormat, "c'est pas une photo");

          photoContainer.innerHTML += /*html*/ `
        <div class="photo-container-card">
        <video width="100%" >
        <source src="../../assets/photographers/${
          responseJS.photographers[currentIdIndex].name.split(" ")[0]
        }/${mediaFormat}" type="video/webm" />
         Download the
         <a href="/media/cc0-videos/flower.webm">WEBM</a>
         video.
        </video>
          <div class="photo-card-info">
          <p>${photographerMedia[i].title}</p> 
          <span>${
            photographerMedia[i].likes
          }  <i class="fa-regular fa-heart like " media-id=${
            photographerMedia[i].id
          } ></i></span>
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
          }"  />
          <div class="photo-card-info">
          <p>${photographerMedia[i].title}</p>
          <span>${
            photographerMedia[i].likes
          }<i class="fa-regular fa-heart like" media-id=${
            photographerMedia[i].id
          }></i></span>
         </div>
        </div>
      `;
        }
      }
    };

    injectHtmlPhotographer();

    // ! 2) injection des likes

    // *---- CLASS LIKE -------------------------------
    const like = document.querySelectorAll(".like");
    const likeCard = document.querySelector(".like-card");

    // -----------currentLike represente le nombre de Like total, on lui ajoute AddedLike(qui est variable) "191"
    let currentLike = (number) =>
      photographerMedia
        .map((obj) => {
          return obj.likes;
        })
        .reduce((sum, currentNote) => {
          return (sum += currentNote);
        }, 1) + number;
    console.log(currentLike(0));

    // ------- AddedLike est un tableau qui regroupera les ID des bouton cliqués. Avec length on a la longueur du tableau et donc le nombre de like à ajouter au total
    let AddedLike = [];

    // ----- injectLike() injection html de la LIKE CARD
    const injectLike = () => {
      likeCard.innerHTML = /*html*/ `<div class="like-card-number">${currentLike(
        AddedLike.length
      )} <i class="fa-solid fa-heart"></i></div>
    <div class="like-card-price">${
      responseJS.photographers[currentIdIndex].price
    }€/ jour</div>`;
    };

    injectLike();

    //  For Each de gestion des boutons like "au clique" individiellement
    like.forEach((item) => {
      item.addEventListener("click", (e) => {
        console.log(item.parentElement.innerHTML);
        console.log(item.previousSibling.textContent);

        item.classList.toggle("fa-regular");
        item.classList.toggle("fa-solid");

        // CurrentLiekTab sert à décomposer les classes de l'icon I en tableau afin de le parcourir avec includes()
        let currentImgId = e.target.attributes[1].value;

        // si l'ID de l'image n'est pas deja incluse dans le tableau, on l'ajoute, sinon on la retire
        if (!AddedLike.includes(currentImgId)) {
          AddedLike.push(currentImgId);
          //    On ajoute +1 au previousSibling
          item.previousSibling.textContent = `${
            Number(item.previousSibling.textContent) + 1
          }`;
        } else {
          AddedLike = AddedLike.filter((obj) => obj != currentImgId);
          //    On retire -1 au previousSibling
          item.previousSibling.textContent = `${
            Number(item.previousSibling.textContent) - 1
          }`;
        }
        console.log(AddedLike);
        console.log(AddedLike.length);
        currentLike(AddedLike.length);
        injectLike();
      });
    });

    // ! 3) Tri activable

    //TODO 1) d'abord interagir sur tableau d'objet , 2) mettre dans une fonction qui ressort le visuel
    // ! OK ----------  4) Light box
    const photoContainerCard = document.querySelectorAll(
      ".photo-container-card img, .photo-container-card video"
    );

    console.log(photoContainerCard);

    // Fonction qui gère l'ouverture de la lightbox et l'injection de l'image correspondante au clique
    const lightBoxModal = document.querySelector(".lightbox-modal");

    const openLightBox = (e, index) => {
      // Je déclare une variable initialement égale à "index" qui sera incrémenté ou décrémenté aux cliques flèche droit ou gauche
      let lightboxIndexNew = index;

      console.log("ca ouvre la modale photo", index);
      console.log(photographerMedia);
      //   console.log(photographerMedia[index]);
      //   console.log(responseJS.photographers[currentIdIndex].name.split(" ")[0]);

      lightBoxModal.style.display = "flex";

      //   Si ce n'est pas une img j'injecte video, sinon j'injecte img en innerHTML
      const injectHtmlLightbox = () => {
        if (!photographerMedia[lightboxIndexNew].image) {
          lightBoxModal.innerHTML = /*html*/ ` 
  
            <i class="fa-solid fa-xmark" onclick="closeLightBox()"></i>
            <div class="btn-left">
            <i class="fa-solid fa-chevron-left"></i>
                </div>
                <div class="btn-right">
            <i class="fa-solid fa-chevron-right"></i>
            </div>
                <div class="lightbox-photo">
                    <video controls width="100%" >
                    <source src="../../assets/photographers/${
                      responseJS.photographers[currentIdIndex].name.split(
                        " "
                      )[0]
                    }/${
            photographerMedia[lightboxIndexNew].video
          }" type="video/webm" />
                    Download the
                    <a href="/media/cc0-videos/flower.webm">WEBM</a>
                    video.
                    </video>
                    <h3>${photographerMedia[index].title}</h3>
                </div>`;
        } else {
          lightBoxModal.innerHTML = /*html*/ ` 
  
            <i class="fa-solid fa-xmark" onclick="closeLightBox()"></i>
            <div class="btn-left">
            <i class="fa-solid fa-chevron-left"></i>
                </div>
                <div class="btn-right">
            <i class="fa-solid fa-chevron-right"></i>
            </div>
                <div class="lightbox-photo">
                <img src="../../assets/photographers/${
                  responseJS.photographers[currentIdIndex].name.split(" ")[0]
                }/${
            photographerMedia[lightboxIndexNew].image
          }" alt="photo nommée ${photographerMedia[lightboxIndexNew].title}">
                <h3>${photographerMedia[lightboxIndexNew].title}</h3>
            </div>`;
        }
      };

      injectHtmlLightbox();

      //   Après l'injection HTML je gère les flèches G/D

      const btnRight = document.querySelector(".btn-right");
      const btnLeft = document.querySelector(".btn-left");

      //   On déclare les fonction qui seront joué aux evement click souris ou Keypress
      const clickBtnRight = () => {
        lightboxIndexNew = lightboxIndexNew + 1;
        if (lightboxIndexNew > photographerMedia.length - 1) {
          lightboxIndexNew = 0;
        }
        // on rejoue la fonction openLightBox pour mettre à jour le HTML
        openLightBox(e, lightboxIndexNew);
      };

      btnRight.addEventListener("click", () => {
        clickBtnRight();
      });

      const clickBtnLeft = () => {
        lightboxIndexNew = lightboxIndexNew - 1;
        if (lightboxIndexNew < 0) {
          lightboxIndexNew = photographerMedia.length - 1;
        }
        openLightBox(e, lightboxIndexNew);
      };
      btnLeft.addEventListener("click", () => {
        clickBtnLeft();
      });

      //   Gestion des boutons Gauche/droit au clavier
      document.addEventListener("keydown", (e) => {
        console.log("yes", e);
        if (e.key === "ArrowRight") {
          clickBtnRight();
        } else if (e.key === "ArrowLeft") {
          clickBtnLeft();
        } else if (e.key === "Escape") {
          closeLightBox();
        }
      });
    };

    console.log(photographerMedia);

    // Je cible au clique toutes les card photos/video
    photoContainerCard.forEach((item, index) => {
      item.addEventListener("click", (e) => openLightBox(e, index));
    });
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
