const userImages = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const differentUsersFragment = document.createDocumentFragment();

const renderPictures = (picturesData) => {
  picturesData.forEach(({ url, description, comments, likes }) => {
    const userElement = picturesTemplate.cloneNode(true);
    userElement.querySelector('.picture__img').src = url;
    userElement.querySelector('.picture__img').alt = description;
    userElement.querySelector('.picture__comments').textContent = comments.length;
    userElement.querySelector('.picture__likes').textContent = likes;
    differentUsersFragment.appendChild(userElement);
  });
  userImages.appendChild(differentUsersFragment);
};

export { renderPictures };
