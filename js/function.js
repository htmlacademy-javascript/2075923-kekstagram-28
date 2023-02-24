// Задача 1
function checkLength(stringToCheck, maxLength) {
  return stringToCheck.length <= maxLength;
}
// console.log(checkLength('проверяемая строка', 20));
// console.log(checkLength('проверяемая строка', 18));
// console.log(checkLength('проверяемая строка', 10));

// Задача 2
function checkPalindrome(strokeIsPalindrome) {
  strokeIsPalindrome = strokeIsPalindrome.toLowerCase();
  return strokeIsPalindrome === strokeIsPalindrome.split('').reverse().join('');
}
// console.log(checkPalindrome('топот'));
// console.log(checkPalindrome('ДовОд'));
// console.log(checkPalindrome('кекс'));

// Задача 3
function getNumber(numberAsString) {
  let numbers = '';
  for (let i = 0; i < numberAsString.length; i++) {
    const element = numberAsString[i];
    if ((!parseInt(element, 10)) && (parseInt(element, 10) !== 0)) {
      continue;
    }
    numbers += element;
  }
  return parseInt(numbers, 10);
}

// console.log(getNumber('2023 год'));            // 2023
// console.log(getNumber('ECMAScript 2022'));     // 2022
// console.log(getNumber('1 кефир, 0.5 батона')); // 105
// console.log(getNumber('агент 007'));           // 7
// console.log(getNumber('а я томат'));           // NaN

// Задача 4
function myPadStart(string, minLength, pad) {
  const actualPad = minLength - string.length;
  if (actualPad <= 0) {
    return string;
  }
  return pad.slice(0, actualPad % pad.length) + pad.repeat (actualPad / pad.length) + string;
}

console.log(myPadStart('1', 2, '0'));      // '01'
console.log(myPadStart('1', 4, '0'));      // '0001'
console.log(myPadStart('q', 4, 'werty'));  // 'werq'
console.log(myPadStart('q', 4, 'we'));     // 'wweq'
console.log(myPadStart('qwerty', 4, '0')); // 'qwerty'

