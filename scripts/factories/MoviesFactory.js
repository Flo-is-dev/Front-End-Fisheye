const MediaFactory = (media, photographerFirstName) => {
  //   console.log(media);
  if (media.image) {
    return {
      media,
      MediaDisplay() {
        return /*html*/ ` <div class="photo-container-card">
            
                    <img src="../../assets/photographers/${photographerFirstName}/${media.image}" alt="photo nommée ${media.title}" role="link" aria-label="voir la photo ${media.title} en pleine écran" tabindex=0 />
                
                <div class="photo-card-info" aria-label="titre de la photo et nombre de like">
                <p>${media.title}</p>
                <span>${media.likes}
                <button class="like" media-id=${media.id} type="button" aria-label="like   avec le" tabindex="0">
                <i class="fa-regular fa-heart"  ></i>
                </button></span>
                </div>
                </div>`;
      },
    };
  } else if (media.video) {
    // hasOwnProperty
    return {
      media,
      MediaDisplay() {
        return /*html*/ `<div class="photo-container-card">
  
                <video width="100%" role="link" aria-label="voir la video ${media.title} en pleine écran" tabindex=0> 
                <source src="../../assets/photographers/${photographerFirstName}/${media.video}" type="video/webm" />
                </video>
        
            <div class="photo-card-info" aria-label="titre de la photo et nombre de like">
                <p>${media.title}</p> 
                <span>${media.likes}  
                <button class="like" media-id=${media.id} type="button" aria-label="like" tabindex="0">
            <i class="fa-regular fa-heart"></i> 
                </button>
                </span>
            </div>
            </div>`;
      },
    };
  } else {
    console.log("Type de document inconnu");
    return null;
  }
};
