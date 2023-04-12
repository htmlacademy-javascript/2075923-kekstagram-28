const STEP = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const DEFAULT_VALUE = 100;
const loadForm = document.querySelector('.img-upload__overlay');
const scaleSmaller = loadForm.querySelector('.scale__control--smaller');
const scaleBigger = loadForm.querySelector('.scale__control--bigger');
const scaleValueInput = loadForm.querySelector('.scale__control--value');
const imagePreview = loadForm.querySelector ('.img-upload__preview');


const scaleImage = (value) => {
  imagePreview.style.transform = `scale(${value / 100})`;
  scaleValueInput.value = `${value}%`;
};

const resetScale = () => scaleImage(DEFAULT_VALUE);

const smallerButtonClick = () =>{

  const currentValue = parseInt(scaleValueInput.value,10);
  let newValue = currentValue - STEP;

  if (newValue < MIN_VALUE){
    newValue = MIN_VALUE;
  }
  scaleImage(newValue);
};

const biggerButtonClick = () =>{
  const currentValue = parseInt(scaleValueInput.value,10);

  let newValue = currentValue + STEP;

  if (newValue > MAX_VALUE){
    newValue = MAX_VALUE;
  }
  scaleImage(newValue);
};

scaleSmaller.addEventListener('click', smallerButtonClick);
scaleBigger.addEventListener('click', biggerButtonClick);

export {resetScale};
