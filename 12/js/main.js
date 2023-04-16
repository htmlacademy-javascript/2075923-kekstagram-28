import { renderGallery } from './big-picture.js';
import {closeImageForm, formSubmit} from './form.js';
import { showAlert, showSuccess, showError} from './util.js';
import {getData, sendData} from './api.js';

formSubmit(async (data) => {
  try {
    await sendData(data);
    closeImageForm();
    showSuccess();
  } catch {
    showError();
  }
});

try {
  const data = await getData();
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}
