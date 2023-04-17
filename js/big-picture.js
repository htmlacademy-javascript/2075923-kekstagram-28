import { renderPictures } from './pictures.js';

const COMMENTS_MAX_SHOWN = 5;
let pictures = [];
let bigPictureShownId = -1;
let commentsShown = 0;
const bigPicture = document.querySelector('.big-picture');
const container = document.querySelector('.pictures');
const cancelButton = document.querySelector('.big-picture__cancel');
const socialCommentList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const socialCommentsCount = document.querySelector('.social__comment-count');

const makeComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  const commentPicture = document.createElement('img');
  commentPicture.classList.add = ('social__picture');
  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  comment.appendChild(commentPicture);
  comment.appendChild(commentText);

  commentPicture.src = avatar;
  commentPicture.alt = name;
  commentText.textContent = message;

  return comment;
};

const renderComments = (comments) => {
  const commentsShownPrev = commentsShown;
  commentsShown += COMMENTS_MAX_SHOWN;

  if (commentsShownPrev === 0){
    socialCommentList.innerHTML = '';
  }
  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();

  for (let i = commentsShownPrev; i < commentsShown; i++) {
    const commentElement = makeComment(comments[i]);
    fragment.append(commentElement);
  }

  socialCommentList.append(fragment);
  socialCommentsCount.innerHTML = `${commentsShown} из <span class="comments-count"> ${comments.length} </span> комментариев`;
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
  bigPictureShownId = -1;
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

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
  bigPictureShownId = data.id;
  renderPicturesData(data);
  renderComments(data.comments);
};

commentsLoader.addEventListener('click', (evt) => {
  evt.preventDefault();
  const data = pictures.find(
    (item) => item.id === bigPictureShownId
  );
  renderComments(data.comments);
});

const onCancelButtonClick = () => {
  hideBigPicture();
};
cancelButton.addEventListener('click', onCancelButtonClick);

const renderGallery = (otherPictures) => {
  pictures = otherPictures;
  container.addEventListener('click', (evt) => {
    const userElement = evt.target.closest('[data-user-element-id]');
    if (!userElement) {
      return;
    }

    const picture = otherPictures.find(
      (item) => item.id === Number(userElement.dataset.userElementId)
    );
    showBigPicture(picture);
  });
  renderPictures(otherPictures);
};
export { renderGallery };
