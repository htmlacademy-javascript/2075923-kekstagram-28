const ALERT_SHOW_TIME = 5000;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showSuccess = () => {
  const template = document.querySelector('#success').content.querySelector('.success');
  const fragment = document.createDocumentFragment();
  const newSuccessMessage = template.cloneNode(true);
  fragment.appendChild(newSuccessMessage);
  document.body.appendChild(fragment);

  const successMessage = document.querySelector('.success');
  const successButton = document.querySelector('.success__button');
  successMessage.classList.add('.hidden');

  const closeSuccessMessage = (evt) => {
    successMessage.classList.add('hidden');
    successButton.removeEventListener('click', (evt));
    document.removeEventListener('keydown', (evt));
  };

  successButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeSuccessMessage();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeSuccessMessage();
    }
  });

  document.addEventListener('click', (evt) => {
    const message = evt.target.matches('.success');
    if (!message) {
      return;
    }
    closeSuccessMessage();
  });
};

const showError = () => {
  const template = document.querySelector('#error').content.querySelector('.error');
  const fragment = document.createDocumentFragment();
  const newErrorMessage = template.cloneNode(true);
  fragment.appendChild(newErrorMessage);
  document.body.appendChild(fragment);

  const errorMessage = document.querySelector('.error');
  const errorButton = document.querySelector('.error__button');
  errorMessage.classList.add('.hidden');

  const closeErrorMessage = (evt) => {
    errorMessage.classList.add('hidden');
    errorButton.removeEventListener('click', (evt));
    document.removeEventListener('keydown', (evt));
  };

  errorButton.addEventListener('click', (evt) => {
    closeErrorMessage();
    evt.preventDefault();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeErrorMessage();
      evt.preventDefault();
    }
  });

  document.addEventListener('click', (evt) => {
    const message = evt.target.matches('.error');
    if (!message) {
      return;
    }
    closeErrorMessage();
  });
};

export{getRandomInteger, showAlert, showSuccess,showError};
