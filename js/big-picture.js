import { renderPictures } from './pictures.js';
import { makeComments } from './comments.js';


const bigPicture = document.querySelector('.big-picture');
const container = document.querySelector('.pictures');
const cancelButton = document.querySelector('.big-picture__cancel');


const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};
cancelButton.addEventListener('click', onCancelButtonClick);

const renderPicturesData = ({ description, url, likes }) => {
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
};

const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPicturesData(data);
  makeComments(data.comments);
};


const renderGallery = (otherPictures) => {
  container.addEventListener('click', (evt) => {
    const userElement = evt.target.closest('[data-user-element-id]');
    if (!userElement) {
      return;
    }

    const picture = otherPictures.find(
      (item) => item.id === +userElement.dataset.userElementId
    );
    showBigPicture(picture);
  });
  renderPictures(otherPictures);
};
export { renderGallery };
