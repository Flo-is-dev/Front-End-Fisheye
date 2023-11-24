const MediaFactory = ({ media }) => ({
  // d'abord vérif si img ou video
  // etape 2 on retourne le HTMLinner qui correspond
  media,
  MediaDisplay() {
    return `${this.media}`;
  },
});

let monDOcument = document.getElementById("id du conteneur html");

photographerMedias.forEach((item) => {
  const mediaHTML = MediaFactory(item);
});

// 2 étapes, 1) voir media type pour savoir vers ou on redifirige le media
// Avoir une verfication en amont
