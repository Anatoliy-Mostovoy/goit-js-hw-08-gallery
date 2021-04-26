import gallerys from './gallery-items.js' ;

const galleryContainer = document.querySelector('.js-gallery');
const openModal = document.querySelector('.lightbox')
const pictureModal = document.querySelector('.lightbox__image');
const closeModal = document.querySelector('.lightbox__button')
const makeGallery = createGallery(gallerys);
//todo записываем значение элеиента на котором произошло событие(клик)
let currentEventLi; 

galleryContainer.insertAdjacentHTML('afterbegin',makeGallery)

galleryContainer.addEventListener('click', onPictureGalleryClick);
closeModal.addEventListener('click', onCloseModalBtnClick)
//todo создаем раметку
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
    currentEventLi = event.target.parentNode; //todo обращаеся к родителю елемента на ктором произошло событие - это li
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
        let pressOnBtnLeft= currentEventLi.nextElementSibling //todo переменная, которая присваивает следующий эоемент(li)
        //todo проверяем есть ли следующий элемент
        if(!pressOnBtnLeft){
        //todo если элеиента нет - подставляем первый
            pressOnBtnLeft=galleryContainer.firstElementChild
        }
        //todo присваиваем текущему значению картинку
        pictureModal.src = pressOnBtnLeft.lastElementChild.dataset.source
        currentEventLi = pressOnBtnLeft;
    }
    if(event.code=== 'ArrowLeft'){
        let pressOnBtnRight = currentEventLi.previousElementSibling
        if(!pressOnBtnRight){
            pressOnBtnRight=galleryContainer.lastElementChild
        }
        pictureModal.src = pressOnBtnRight.lastElementChild.dataset.source
        currentEventLi = pressOnBtnRight;
    }
    
}
 