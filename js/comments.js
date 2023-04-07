let commentsExist = 0;
const commentsMax = 5;
const socialComments = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const commentCount = document.querySelector('.social__comment-count');

const createComment = ({ avatar, name, message }) => {
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

const makeComments = (comments) => {
  commentsExist += commentsMax;

  if (commentsExist >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsExist = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < commentsExist; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }

  socialComments.innerHTML = '';
  socialComments.append(fragment);
  commentCount.innerHTML = `${commentsExist} из <span class="comments-count"> ${comments.length} </span> комментариев`;
};

export { makeComments };
