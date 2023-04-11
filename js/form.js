
const COMMENT_MAX_LENGTH = 140;
const COMMENT_ERROR_TEXT = 'Превышен лимит символов';
const HASGTAGS_ERROR_TEXT = 'Ошибка в поле ввода. Пожалуйста, проверьте правильность заполнения:Хэш-тег начинается с # и состоит из букв и цифр без пробелов, спецсимволов, пунктуации и эмодзи;Длина хэш-тега не должна превышать 20 символов;Хэш-теги разделяются пробелами;Нельзя использовать один и тот же хэш-тег дважды;Максимальное количество хэш-тегов - 5.';
const AVAILABLE_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAGS_LIMIT = 5;
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

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    loadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    loadForm.reset();
    pristine.reset();
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

const onFocus = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onBlur = () => {
  document.addEventListener('keydown', onDocumentKeydown);
};

const fieldFocus = (field) => {
  field.addEventListener('focus', onFocus);
};
const fieldBlur = (field) => {
  field.addEventListener('blur', onBlur);
};

const fieldFocusRemove = (field) => {
  field.removeEventListener('focus', onFocus);
};
const fieldBlurRemove = (field) => {
  field.removeEventListener('blur', onBlur);
};

const focus = () => {
  fieldFocus(fieldHashtags);
  fieldBlur(fieldHashtags);
  fieldFocus(fieldСomments);
  fieldBlur(fieldСomments);
};
const focusRemove = () => {
  fieldFocusRemove(fieldHashtags);
  fieldBlurRemove(fieldHashtags);
  fieldFocusRemove(fieldСomments);
  fieldBlurRemove(fieldСomments);
};

const closeImageForm = () => {
  loadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  loadForm.reset();
  pristine.reset();
  focusRemove();
};
const openImageForm = () => {
  loadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  buttonCloseImageForm.addEventListener('click', closeImageForm);
  focus();
};

const editImages = () => {
  openImageForm();
};

loadFile.addEventListener('change', editImages);
