const overlay = document.querySelector(".overlay-modal");
const modal = document.getElementById("contact_modal");

function displayModal() {
  modal.style.display = "block";
  overlay.style.opacity = 1;
  overlay.style.visibility = "visible";
}

function closeModal() {
  modal.style.display = "none";
  overlay.style.opacity = 0;
  overlay.style.visibility = "hidden";
}
