const PictureConstant = {
  STEP: 25,
  MIN_VALUE: 25,
  MAX_VALUE: 100,
  DEFAULT_VALUE: 100,
  INTEGER_VALUE: 100,
};
const loadForm = document.querySelector('.img-upload__overlay');
const scaleSmaller = loadForm.querySelector('.scale__control--smaller');
const scaleBigger = loadForm.querySelector('.scale__control--bigger');
const scaleValueInput = loadForm.querySelector('.scale__control--value');
const imagePreview = loadForm.querySelector ('.img-upload__preview img');

const scaleImage = (value) => {
  imagePreview.style.transform = `scale(${value / PictureConstant.INTEGER_VALUE})`;
  scaleValueInput.value = `${value}%`;
};

const resetScale = () => scaleImage(PictureConstant.DEFAULT_VALUE);

const onSmallerButtonClick = () =>{

  const currentValue = parseInt(scaleValueInput.value,10);
  let newValue = currentValue - PictureConstant.STEP;

  if (newValue < PictureConstant.MIN_VALUE){
    newValue = PictureConstant.MIN_VALUE;
  }
  scaleImage(newValue);
};

const onBiggerButtonClick = () =>{
  const currentValue = parseInt(scaleValueInput.value,10);

  let newValue = currentValue + PictureConstant.STEP;

  if (newValue > PictureConstant.MAX_VALUE){
    newValue = PictureConstant.MAX_VALUE;
  }
  scaleImage(newValue);
};

scaleSmaller.addEventListener('click', onSmallerButtonClick);
scaleBigger.addEventListener('click', onBiggerButtonClick);

export {resetScale};
