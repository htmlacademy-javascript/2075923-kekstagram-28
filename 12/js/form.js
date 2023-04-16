
import { resetScale } from './scale-pictures.js';
import { resetEffects } from './filter.js';
import { showAlert } from './util.js';


const COMMENT_MAX_LENGTH = 140;
const COMMENT_ERROR_TEXT = 'Превышен лимит символов';
const HASGTAGS_ERROR_TEXT = 'Ошибка в поле ввода. Пожалуйста, проверьте правильность заполнения:Хэш-тег начинается с # и состоит из букв и цифр без пробелов, спецсимволов, пунктуации и эмодзи;Длина хэш-тега не должна превышать 20 символов;Хэш-теги разделяются пробелами;Нельзя использовать один и тот же хэш-тег дважды;Максимальное количество хэш-тегов - 5.';
const AVAILABLE_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAGS_LIMIT = 5;
const IMAGE_TYPES = ['jpg', 'jpeg', 'png'];
const WRONG_IMAGE_TYPES_MESSAGE = 'Формат изображения должен быть png, jpeg или jpg';
const loadForm = document.querySelector('.img-upload__form');
const loadFile = loadForm.querySelector('#upload-file');
const loadOverlay = loadForm.querySelector('.img-upload__overlay');
const buttonCloseImageForm = loadForm.querySelector('#upload-cancel');
const body = document.querySelector('body');
const fieldHashtags = loadForm.querySelector('.text__hashtags');
const fieldСomments = loadForm.querySelector('.text__description');

const pristine = new Pristine(loadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const DataButton = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    loadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    loadForm.reset();
    pristine.reset();
    resetScale();
    resetEffects();
  }
};


const validateHashtagsCount = (tags) => tags.length <= HASHTAGS_LIMIT;


const validateDifference = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};


const validHashtag = (tag) => AVAILABLE_SYMBOLS.test(tag);


const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return validateHashtagsCount(tags) && validateDifference(tags) && tags.every(validHashtag);
};

pristine.addValidator(
  fieldHashtags,
  validateTags,
  HASGTAGS_ERROR_TEXT
);

const validateCommentsField = (comment) => (comment.length <= COMMENT_MAX_LENGTH);

pristine.addValidator(
  fieldСomments,
  validateCommentsField,
  COMMENT_ERROR_TEXT
);

const onFocusFieldFocus = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onBlurFieldBlur = () => {
  document.addEventListener('keydown', onDocumentKeydown);
};

const focusField = (field) => {
  field.addEventListener('focus', onFocusFieldFocus);
};
const blurField = (field) => {
  field.addEventListener('blur', onBlurFieldBlur);
};

const focusRemoveField = (field) => {
  field.removeEventListener('focus', onFocusFieldFocus);
};
const blurRemoveField = (field) => {
  field.removeEventListener('blur', onBlurFieldBlur);
};

const focus = () => {
  focusField(fieldHashtags);
  blurField(fieldHashtags);
  focusField(fieldСomments);
  blurField(fieldСomments);
};
const focusRemove = () => {
  focusRemoveField(fieldHashtags);
  blurRemoveField(fieldHashtags);
  focusRemoveField(fieldСomments);
  blurRemoveField(fieldСomments);
};

const closeImageForm = () => {
  loadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  loadForm.reset();
  pristine.reset();
  focusRemove();
  resetScale();
  resetEffects();
};
const openImageForm = () => {
  loadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  buttonCloseImageForm.addEventListener('click', closeImageForm);
  const file = loadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = IMAGE_TYPES.some((it) => fileName.endsWith(it));
  if (!matches) {
    showAlert(WRONG_IMAGE_TYPES_MESSAGE);
    closeImageForm();
  }
  focus();
};

const blockSubmitButton = () => {
  buttonCloseImageForm.disabled = true;
  buttonCloseImageForm.textContent = DataButton.SENDING;
};

const unblockSubmitButton = () => {
  buttonCloseImageForm.disabled = false;
  buttonCloseImageForm.textContent = DataButton.IDLE;
};

const formSubmit = (cb) => {
  loadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(loadForm));
      unblockSubmitButton();
    }
  });
};

const editImages = () => {
  openImageForm();
};

loadFile.addEventListener('change', editImages);

export { closeImageForm, formSubmit };

