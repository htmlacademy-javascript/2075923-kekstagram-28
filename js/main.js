import {createImages} from './data.js';
import {renderPictures} from './pictures.js';
import { renderGallery } from './big-picture.js';
const images = createImages();
renderPictures(images);
renderGallery(images);
