import gallerys from './gallery-items.js' ;

const galleryContainer = document.querySelector('.js-gallery');
const openModal = document.querySelector('.lightbox')
const pictureModal = document.querySelector('.lightbox__image');
const closeModal = document.querySelector('.lightbox__button')
const makeGallery = createGallery(gallerys);

galleryContainer.insertAdjacentHTML('afterbegin',makeGallery)

galleryContainer.addEventListener('click', onPictureGalleryClick);
closeModal.addEventListener('click', onCloseModalBtnClick)

function createGallery (images){
    return images.map(image=>{
        return   `
        <li class="gallery__item">
        <img
          class="gallery__image"
          src="${image.preview}"
          data-source="${image.original}"
          alt="${image.description}"
        />
    </li>
        `
    }).join('');
}

function onPictureGalleryClick(event){

    if(!event.target.classList.contains('gallery__image')){
        return
    }
    openModal.classList.add('is-open');
    pictureModal.src = `${event.target.dataset.source}`;
}

function onCloseModalBtnClick(e){
    openModal.classList.remove('is-open')
}

const r = document.querySelector('.gallery__image')
console.log(r.dataset)

