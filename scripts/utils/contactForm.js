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

const inputs = document.querySelectorAll("input[type=text],input[type=email]");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");

const firstnameChecker = (value) => {
  console.log(value);
  if (value.length <= 1) {
    firstName.parentElement.classList.add("error");
    firstName.classList.add("error-input");
    return false;
  } else {
    firstName.parentElement.classList.remove("error");
    firstName.classList.remove("error-input");
    return true;
  }
};

const lastnameChecker = (value) => {
  //   console.log(value);
  //   const lastName = document.getElementById("last");
  if (value.length <= 1) {
    lastName.parentElement.classList.add("error");
    lastName.classList.add("error-input");
    return false;
  } else {
    lastName.parentElement.classList.remove("error");
    lastName.classList.remove("error-input");
    return true;
  }
};

const emailChecker = (value) => {
  //   const email = document.getElementById("email");
  //   console.log(value);
  if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    email.parentElement.classList.add("error");
    email.classList.add("error-input");
    return false;
  } else {
    email.classList.remove("error-input");
    email.parentElement.classList.remove("error");
    return true;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "first":
        firstnameChecker(e.target.value);
        break;
      case "last":
        lastnameChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;

      default:
        null;
    }
  });
});

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
    console.log(data);

    contactForm.reset();
    closeModal();
  }
});
