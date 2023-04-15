const ALERT_SHOW_TIME = 5000;
const templateError = document.querySelector('#error').content.querySelector('.error');
const errorButton = templateError.querySelector('.error__button');
const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const successButton = templateSuccess.querySelector('.success__button');
const body = document.querySelector('body');

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


const onModalEscKeydown = (evt) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    closeModalMessage();
  }
};


function isSuccessModal (evt) {
  if (!evt.target.classList.contains('success')) {
    return;
  }
  closeModalMessage();
}

function isErrorModal (evt) {
  if (!evt.target.classList.contains('error')) {
    return;
  }
  closeModalMessage();
}

function closeModalMessage() {
  templateSuccess.classList.add('hidden');
  templateError.classList.add('hidden');
  body.classList.remove('error-active');
}

const showSuccess = () => {
  body.append(templateSuccess);
  templateSuccess.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscKeydown);
};

const showError = () => {
  body.append(templateError);
  body.classList.add('error-active');
  templateError.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscKeydown);
};


successButton.addEventListener('click', closeModalMessage);
errorButton.addEventListener('click', closeModalMessage);
document.addEventListener('click', isSuccessModal);
document.addEventListener('click', isErrorModal);


export{showAlert, showSuccess,showError};
