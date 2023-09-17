const overlay = document.querySelector(".overlay-modal");
const modal = document.getElementById("contact_modal");
const contactButton = document.querySelector(".contact_button");
const contactForm = document.getElementById("contactForm");

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

contactButton.addEventListener("click", (e) => {
  e.preventDefault();

  data = {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    message: message.value,
  };
  console.log(data);

  contactForm.reset();
  closeModal();
});
