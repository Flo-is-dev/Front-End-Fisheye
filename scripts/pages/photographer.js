//Mettre le code JavaScript lié à la page photographer.html

// *----Récupération de l'ID ciblé

const urlSearchParams = new URLSearchParams(window.location.search);

const param = urlSearchParams.get("id");
console.log("id", param);

// Localiser à l'objet window
