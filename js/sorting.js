import { debounce } from './util.js';
import { renderPictures } from './pictures.js';

const PHOTO_COUNT = 10;
const SORT_NUMBER = 0.5;
const RENDER_DELAY = 500;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
let sortedPhotos = [];
let currentFilter = Filter.DEFAULT;

const filterContainerElement = document.querySelector('.img-filters');
const filterFormElement = filterContainerElement.querySelector('.img-filters__form');
const filterButton = filterFormElement.querySelectorAll('.img-filters__button');
const imageContainerElement = document.querySelector('.pictures');

const getRandomSorting = () => Math.random() - SORT_NUMBER;

const getMostDiscussed = (a, b) => b.comments.length - a.comments.length;

const deleteOldPhotos = () => {
  const photosElements = imageContainerElement.querySelectorAll('.picture');
  photosElements.forEach((photo) => {
    photo.remove();
  });
};

const getSortedPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...sortedPhotos].sort(getRandomSorting).slice(0, PHOTO_COUNT);
    case Filter.DISCUSSED:
      return [...sortedPhotos].sort(getMostDiscussed);
    default:
      return [...sortedPhotos];
  }
};

const initializePhotoSortingAndFilters = (loadedPhotos) => {
  const debouncedCallback = debounce(renderPictures, RENDER_DELAY);
  filterContainerElement.classList.remove('img-filters--inactive');
  sortedPhotos = [...loadedPhotos];

  filterFormElement.addEventListener('click', (evt) => {
    if (evt.target.matches('.img-filters__button--active:not(#filter-random)') &&
      evt.target.matches('.img-filters__button--active')) {
      return;
    }
    filterButton.forEach((item) => item.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    currentFilter = evt.target.id;
    deleteOldPhotos();
    debouncedCallback(getSortedPictures());
  });
  debouncedCallback(getSortedPictures());
};

export { initializePhotoSortingAndFilters };
