const overlayModal = document.querySelector(".overlay-modal");
const lightBoxModal = document.querySelector(".mightbox-modal");

const displayLightBox = () => {
  //   lightBoxModal.style.display = "block";
  //   overlayModal.style.opacity = 1;
  //   overlayModal.style.visibility = "visible";
  console.log("Ca ouvre la lightbox");
};

const closeLightBox = () => {
  lightBoxModal.style.display = "none";
  overlayModal.style.opacity = 0;
  overlayModal.style.visibility = "hidden";
};
