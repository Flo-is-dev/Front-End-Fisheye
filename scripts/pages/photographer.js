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

    return responseJS;
  } catch (error) {
    console.log(error, "erreur");
  }

  // et bien retourner le tableau photographers seulement une fois récupéré
  return {
    //     photographers: responseJS.photographers,
  };
}

const getPhotographerMedia = (responseJS) => {
  let photographerMediaBis = [];

  for (let i = 0; i < responseJS.media.length; i++) {
    if (responseJS.media[i].photographerId === Number(param)) {
      photographerMediaBis.push(responseJS.media[i]);
    }
  }

  console.log(photographerMediaBis);
  return photographerMediaBis;
};

// FindIndex nous donnera l'index de l'élément correspondant dans le tableau IdPhotoTab, il vérifie pour chaque i si c'est false ou true grace à la fonction isCurrentId

const currentIdIndexFunction = (responseJS) => {
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
  console.log(IdPhotoTab);
  let currentIdIndex = IdPhotoTab.findIndex(isCurrentID);

  return currentIdIndex;
};

const displayProfileHeader = (responseJS, currentIdIndex) => {
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
    <button class="contact_button" type="button" aria-label="ouvrir le formulaire de contact" onclick="displayModal()">Contactez-moi</button>
    <img src="./assets/photographers/Photographers-ID-Photos/${namePhotographe}.jpg" alt="photo de ${responseJS.photographers[currentIdIndex].name}">`;
};

// ! ---------------------------------------------------------------------
// ! ------ 1) injection des photo de la page photographer
// ! ---------------------------------------------------------------------
//   console.log(responseJS.media[0].photographerId);

// Parcour pour atteindre les fichier photographe que je vais injecter
// console.log(responseJS.photographers[currentIdIndex].name);

// inject avec for photographerMedia[i]
const injectHtmlPhotographer = (newMedia, responseJS, currentIdIndex) => {
  const photoContainer = document.querySelector(".photo-container");
  for (let i = 0; i < newMedia.length; i++) {
    // Pour gérer le cas de jpg ou video je passe par une variable intermédiaire et on vérifie si elle est undifined,

    const photographerFirstName =
      responseJS.photographers[currentIdIndex].name.split(" ")[0];

    //   Si c'est une vidéo on inject le code IF sinon img on injecte le ELSE

    const photoContainerInnerHTML = MediaFactory(
      newMedia[i],
      photographerFirstName
    ).MediaDisplay();
    photoContainer.innerHTML += photoContainerInnerHTML;
  }
};

// ! ---------------------------------------------------------------------
// ! 2) injection des likes
// ! ---------------------------------------------------------------------

const displayPhotographerLikes = (
  photographerMediaBis,
  responseJS,
  currentIdIndex
) => {
  const like = document.querySelectorAll(".like");
  const likeCard = document.querySelector(".like-card");
  // Tableau qui va contenir tous les index des photo d'un photographe
  let photographerMedia = photographerMediaBis;

  // -----------currentLike represente le nombre de Like total, on lui ajoute AddedLike(qui est variable)
  let currentLike = (number) =>
    photographerMedia
      .map((obj) => {
        return obj.likes;
      })
      .reduce((sum, currentNote) => {
        return (sum += currentNote);
      }, 1) + number;
  //   console.log(currentLike(0));

  // ------- AddedLike est un tableau qui regroupera les ID des bouton cliqués. Avec length on a la longueur du tableau et donc le nombre de like à ajouter au total
  let AddedLike = [];

  // ----- injectLike() sert à l'injection html de la "LIKE CARD"
  const injectLike = (value) => {
    likeCard.innerHTML = /*html*/ `<div class="like-card-number">${currentLike(
      value
    )} <i class="fa-solid fa-heart"></i></div>
    <div class="like-card-price">${
      responseJS.photographers[currentIdIndex].price
    }€/ jour</div>`;
  };

  injectLike(AddedLike.length);

  //  For Each de gestion des boutons like "au clique" individiellement
  like.forEach((item) => {
    item.addEventListener("click", (e) => likeEvent(e, item));
  });

  const likeEvent = (e, item) => {
    // console.log(item.previousSibling.textContent);

    // on cible l'élémeent enfant du button
    item.firstElementChild.classList.toggle("fa-regular");
    item.firstElementChild.classList.toggle("fa-solid");

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
    injectLike(AddedLike.length);
  };
};

// ! ---------------------------------------------------------------------
// ! 4) Light box (part 1)
// ! ---------------------------------------------------------------------

const openLightBox = (
  e,
  index,
  photographerMedia,
  responseJS,
  currentIdIndex
) => {
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
      
                <i class="fa-solid fa-xmark" tabindex="1" aria-label="close lightbox" onclick="closeLightBox()"></i>
                <div class="btn-left" tabindex="1" aria-label="previous media">
                    <i class="fa-solid fa-chevron-left"></i>
                </div>
                <div class="btn-right" tabindex="1" aria-label="next media">
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
                    <div class="lightbox-photo">
                        <video controls width="100%" role="media" aria-label="current video" >
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
      
                <i class="fa-solid fa-xmark" tabindex="1" aria-label="close lightbox" onclick="closeLightBox()"></i>
                <div class="btn-left" tabindex="1" aria-label="previous media">
                <i class="fa-solid fa-chevron-left"></i>
                    </div>
                    <div class="btn-right" tabindex="1" aria-label="next media">
                <i class="fa-solid fa-chevron-right"></i>
                </div>
                    <div class="lightbox-photo">
                    <img src="../../assets/photographers/${
                      responseJS.photographers[currentIdIndex].name.split(
                        " "
                      )[0]
                    }/${
        photographerMedia[lightboxIndexNew].image
      }" alt="photo nommée ${
        photographerMedia[lightboxIndexNew].title
      }" role="media" aria-label="current image" >
                    <h3>${photographerMedia[lightboxIndexNew].title}</h3>
                </div>`;
    }
    // Sélectionnez tous les autres éléments de la lightbox qui ne doivent pas être accessibles via Tab
    const nonTabElements = document.querySelectorAll(':not([tabindex="1"])');

    // Parcourez ces éléments et définissez leur attribut tabindex="-1"
    nonTabElements.forEach((element) => {
      element.setAttribute("tabindex", "-1");
    });

    // Sélectionnez les boutons de la lightbox
    const btnClose = document.querySelector(".fa-xmark");
    const btnLeft = document.querySelector(".btn-left");
    const btnRight = document.querySelector(".btn-right");

    // Ajoutez des gestionnaires d'événements de clavier pour les boutons
    btnClose.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        closeLightBox();
        location.reload();
      }
    });

    btnLeft.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        clickBtnLeft();
      }
    });

    btnRight.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        clickBtnRight();
      }
    });
  };

  injectHtmlLightbox();

  //   --------------------
  //   Après l'injection HTML je gère les flèches G/D

  const btnRight = document.querySelector(".btn-right");
  const btnLeft = document.querySelector(".btn-left");

  //   On déclare les fonction qui seront joué aux evement click souris ou Keypress
  const clickBtnRight = (e) => {
    lightboxIndexNew = lightboxIndexNew + 1;
    if (lightboxIndexNew > photographerMedia.length - 1) {
      lightboxIndexNew = 0;
    }
    // on rejoue la fonction openLightBox pour mettre à jour le HTML
    openLightBox(
      e,
      lightboxIndexNew,
      photographerMedia,
      responseJS,
      currentIdIndex
    );

    btnRight.removeEventListener("click", clickBtnRightHandler);
    console.log("remove effectué OFF");
    document.removeEventListener("keydown", lightboxEventListener);
  };

  // Stockez la fonction dans une variable pour la remove
  const clickBtnRightHandler = () => {
    clickBtnRight();
  };

  btnRight.addEventListener("click", clickBtnRightHandler);

  const clickBtnLeft = () => {
    lightboxIndexNew = lightboxIndexNew - 1;
    if (lightboxIndexNew < 0) {
      lightboxIndexNew = photographerMedia.length - 1;
    }
    openLightBox(
      e,
      lightboxIndexNew,
      photographerMedia,
      responseJS,
      currentIdIndex
    );
    document.removeEventListener("keydown", lightboxEventListener);
  };
  btnLeft.addEventListener("click", () => {
    clickBtnLeft();
  });

  //   ---------------------------------
  //   Gestion des boutons Gauche/droit au clavier
  const lightboxEventListener = (e) => {
    console.log(e.key);
    if (e.key === "ArrowRight") {
      clickBtnRight();
    } else if (e.key === "ArrowLeft") {
      clickBtnLeft();
    } else if (e.key === "Escape") {
      closeLightBox();
    } //TODO remove les events
    document.removeEventListener("keydown", lightboxEventListener);
  };

  document.addEventListener("keydown", lightboxEventListener);
};

// ! ---------------------------------------------------------------------
// ! 3) Tri activable
// ! ---------------------------------------------------------------------
const displayPhotographerTri = (
  photographerMedia,
  responseJS,
  currentIdIndex
) => {
  const btnTri = document.getElementById("tri");
  // Constante lié à la partie lightBox
  const photoContainerCard = document.querySelectorAll(
    ".photo-container-card img, .photo-container-card video"
  );
  const photoContainer = document.querySelector(".photo-container");

  btnTri.addEventListener("change", (e) => {
    if (e.target.value === "Date") {
      console.log("on a date");
      const sortDate = photographerMedia.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB - dateA;
      });
      console.log("sortDate", sortDate);

      photoContainer.innerHTML = null;
      injectHtmlPhotographer(sortDate, responseJS, currentIdIndex);
    } else if (e.target.value === "Titre") {
      console.log("on a titre");
      const sortTitle = photographerMedia.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      console.log("sortTitle", sortTitle);

      photoContainer.innerHTML = null;
      injectHtmlPhotographer(sortTitle, responseJS, currentIdIndex);
    } else if (e.target.value === "Popularité") {
      console.log("on a popularité");
      const sortLike = photographerMedia.sort((a, b) => b.likes - a.likes);
      console.log("sortLike", sortLike);
      photoContainer.innerHTML = null;
      injectHtmlPhotographer(sortLike, responseJS, currentIdIndex);
    }

    // *--LIGHTBOX-RAPPEL-- on rappel la fonction liée à la lightbox une fois le tri effectué
    const photoContainerCard = document.querySelectorAll(
      ".photo-container-card img, .photo-container-card video"
    );
    photoContainerCard.forEach((item, index) => {
      item.addEventListener("click", (e) =>
        openLightBox(e, index, photographerMedia, responseJS, currentIdIndex)
      );
    });

    photoContainerCard.forEach((item, index) => {
      const keyDownEvent = (e) => {
        if (e.key === "Enter") {
          return openLightBox(
            e,
            index,
            photographerMedia,
            responseJS,
            currentIdIndex
          );
        }
      };

      const focusEvent = () => {
        console.log("image ou video est FOCUS!");
        document.addEventListener("keydown", keyDownEvent);
      };

      const blurEventRemove = () => {
        console.log("REMOVE l'envent listener");
        document.removeEventListener("keydown", keyDownEvent);
      };

      item.addEventListener("focus", focusEvent);

      item.addEventListener("blur", blurEventRemove);
    });

    // *  --LIKE-RAPPEL-- on rappel la fonction liée aux LIKES une fois le tri effectué

    displayPhotographerLikes(photographerMedia, responseJS, currentIdIndex);
  });
};

// ! ---------------------------------------------------------------------
// ! ----------  4) Light box
// ! ---------------------------------------------------------------------

const displayPhotographerLightbox = (
  photographerMedia,
  responseJS,
  currentIdIndex
) => {
  // Fonction qui gère l'ouverture de la lightbox et l'injection de l'image correspondante au clique
  const lightBoxModal = document.querySelector(".lightbox-modal");
  const photoContainerCard = document.querySelectorAll(
    ".photo-container-card img, .photo-container-card video"
  );

  // Je cible au clique toutes les card photos/video

  const openTest = (e, index) => {
    openLightBox(e, index, photographerMedia, responseJS, currentIdIndex);
  };

  photoContainerCard.forEach((item, index) => {
    item.addEventListener("click", (e) => openTest(e, index));
  });
  photoContainerCard.forEach((item, index) => {
    item.removeEventListener("click", (e) => openTest(e, index));
  });

  // ---------Gestion clavier click img et video
  photoContainerCard.forEach((item, index) => {
    const keyDownEvent = (e) => {
      if (e.key === "Enter") {
        return openLightBox(
          e,
          index,
          photographerMedia,
          responseJS,
          currentIdIndex
        );
      }
    };

    const focusEvent = () => {
      console.log("image ou video est FOCUS!");
      document.addEventListener("keydown", keyDownEvent);
    };

    const blurEventRemove = () => {
      console.log("REMOVE l'envent listener");
      document.removeEventListener("keydown", keyDownEvent);
    };

    item.addEventListener("focus", focusEvent);

    item.addEventListener("blur", blurEventRemove);
  });
};

// ! ---------------------------------------------------------------------
// ! 5)---- injection  page contact
// ! ---------------------------------------------------------------------
const displayPhotographerContact = (responseJS, currentIdIndex) => {
  const headerContact = document.getElementById("contact-header");

  headerContact.innerHTML = /*html*/ `
    <h2>Contactez-moi <br> ${responseJS.photographers[currentIdIndex].name}</h2>
                    <img src="assets/icons/close.svg" tabindex="0" type="button" aria-label="fermer le formulaire de contact" id="closeBtn"
                        onclick="closeModal()" />`;

  // END
};

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  const responseJS = await getPhotographers();

  const currentIdIndex = currentIdIndexFunction(responseJS);
  console.log("TOTO", responseJS.photographers);
  //   displayData(photographers);
  displayPhotographerContact(responseJS, currentIdIndex);
  currentIdIndexFunction(responseJS);
  displayProfileHeader(responseJS, currentIdIndex);

  const photographerMediaTer = getPhotographerMedia(responseJS);
  injectHtmlPhotographer(photographerMediaTer, responseJS, currentIdIndex);

  displayPhotographerLikes(photographerMediaTer, responseJS, currentIdIndex);
  displayPhotographerTri(photographerMediaTer, responseJS, currentIdIndex);
  displayPhotographerLightbox(photographerMediaTer, responseJS, currentIdIndex);
}

init();
