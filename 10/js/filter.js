const FILTERS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit:''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit:'',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit:'',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit:'%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit:'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit:'',
  }
];
const imagePreview = document.querySelector('.img-upload__preview img');
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectsContainer = document.querySelector('.effects');
const effectSliderContainer = document.querySelector('.img-upload__effect-level');

const originalFilter = FILTERS[0];
let chosenFilter = originalFilter;

const isDefault = () => chosenFilter === originalFilter;

const openSlider = () => {
  effectSliderContainer.classList.remove('hidden');
};

const closeSlider = () => {
  effectSliderContainer.classList.add('hidden');
};

const updateSlider = () => {
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: chosenFilter.min,
      max: chosenFilter.max,
    },
    step: chosenFilter.step,
    start: chosenFilter.max,
  });
  if (isDefault()) {
    closeSlider();
  } else {
    openSlider();
  }
};

const filtersChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenFilter = FILTERS.find((effect) => effect.name === evt.target.value);
  imagePreview.className = `effects__preview--${chosenFilter.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = effectSlider.noUiSlider.get();
  imagePreview.style.filter = isDefault() ?
    originalFilter.style :
    `${chosenFilter.style}(${sliderValue}${chosenFilter.unit})`;
  effectValue.value = sliderValue;
};

const resetEffects = () => {
  chosenFilter = originalFilter;
  updateSlider();
};

noUiSlider.create(effectSlider, {
  range: {
    min: originalFilter.min,
    max: originalFilter.max,
  },
  start: originalFilter.max,
  step: originalFilter.step,
  connect: 'lower',
});
closeSlider();

effectsContainer.addEventListener('change', filtersChange);
effectSlider.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};
