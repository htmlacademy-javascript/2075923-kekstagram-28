import { createImages } from './data.js';

const userImages = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const differentUsers = createImages();
const differentUsersFragment = document.createDocumentFragment();

differentUsers.forEach(({url, description, comments, likes}) => {
  const userElement = picturesTemplate.cloneNode(true);
  userElement.querySelector('.picture__img').src = url;
  userElement.querySelector('.picture__img').alt = description;
  userElement.querySelector('.picture__comments').textContent = comments;
  userElement.querySelector('.picture__likes').textContent = likes;
  differentUsersFragment.appendChild(userElement);
});
userImages.appendChild(differentUsersFragment);

export{differentUsers};
