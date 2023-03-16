const OBJECTS_COUNT = 25;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createCommentGenerator = (id) => (
  {
    id: id,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: MESSAGES[getRandomInteger(0, 5)],
    name: NAMES[getRandomInteger(0, 7)],
  });

const createIdGenerator = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: 'Лето, день чудесный',
  likes: getRandomInteger(15, 200),
  comments: [createCommentGenerator(id)],
});

const images = Array.from({length: OBJECTS_COUNT}, (v, k) => createIdGenerator(k + 1));

images();
