import {getRandomInteger} from './util.js';

const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;
const MIN_LIKES_NUMBER = 15;
const MAX_LIKES_NUMBER = 200;
const OBJECTS_COUNT = 25;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const MIN_MESSAGES_NUMBER = 0;
const MAX_MESSAGES_NUMBER = MESSAGES.length - 1;
const MIN_COMMENTS_NUMBER = 1;
const MAX_COMMENTS_NUMBER = 25;
const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];
const MIN_NAMES_NUMBER = 0;
const MAX_NAMES_NUMBER = NAMES.length - 1;

const createCommentGenerator = (id) => (
  {
    id: id,
    avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
    message: MESSAGES[getRandomInteger(MIN_MESSAGES_NUMBER, MAX_MESSAGES_NUMBER)],
    name: NAMES[getRandomInteger(MIN_NAMES_NUMBER, MAX_NAMES_NUMBER)],
  });

const createIdGenerator = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: 'Лето, день чудесный',
  likes: getRandomInteger(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER),
  comments: Array.from(
    {length: getRandomInteger(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER)},
    (v, k) => createCommentGenerator(k + 1)
  ),
});

const createImages = () => Array.from({length: OBJECTS_COUNT}, (v, k) => createIdGenerator(k + 1));

export {createImages};
