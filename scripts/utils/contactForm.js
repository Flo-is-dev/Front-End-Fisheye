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

// Gestion formulaire validation

const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");

const firstnameChecker = (value) => {
  if (value.length <= 1) {
    firstName.classList.add("error-input");
    return false;
  } else {
    firstName.classList.remove("error-input");
    return true;
  }
};

const lastnameChecker = (value) => {
  if (value.length <= 1) {
    lastName.classList.add("error-input");
    return false;
  } else {
    lastName.classList.remove("error-input");
    return true;
  }
};

const emailChecker = (value) => {
  if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    email.classList.add("error-input");
    return false;
  } else {
    email.classList.remove("error-input");
    return true;
  }
};

contactButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    !firstnameChecker(firstName.value) ||
    !lastnameChecker(lastName.value) ||
    !emailChecker(email.value)
  ) {
    if (!firstName.value) {
      firstnameChecker("");
    }
    if (!lastName.value) {
      lastnameChecker("");
    }
    if (!emailChecker(email.value)) {
      emailChecker("");
    }
  } else {
    data = {
      firstname: firstName.value,
      lastname: lastName.value,
      email: email.value,
      message: message.value,
    };
    console.log("Objet Data", data);

    contactForm.reset();
    closeModal();
  }
});
