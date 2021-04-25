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
    return images.map(({preview, original, description})=>{
        return   `
        <li class="gallery__item">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
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
    pictureModal.src = event.target.dataset.source;
    window.addEventListener('keydown', onEscOverlayPres);
    window.addEventListener('keydown', onBtnArrowClick);
    
   
}

function onCloseModalBtnClick(e){
    window.removeEventListener('keydown', onEscOverlayPres);
    window.removeEventListener('keydown', onBtnArrowClick);
    openModal.classList.remove('is-open')
    pictureModal.src = '';
}


const overlay = document.querySelector('.lightbox__overlay')
overlay.addEventListener('click', onCloseModalBtnClick);

function onEscOverlayPres(event){
        console.log(event) 
        if(event.code === 'Escape'){
            onCloseModalBtnClick();
        }
}

function onBtnArrowClick(event){
    if(event.code=== 'ArrowRight'){
        console.log('Нажал вправо')
    }
    if(event.code=== 'ArrowLeft'){
        console.log('Нажал влево')
    }
    
}
// ArrowLeft
// ArrowRight