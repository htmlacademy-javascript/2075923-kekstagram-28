// Задача 1
function checkLength(stringToCheck, maxLength) {
  return stringToCheck.length <= maxLength;
}
checkLength ();
// console.log(checkLength('проверяемая строка', 20));
// console.log(checkLength('проверяемая строка', 18));
// console.log(checkLength('проверяемая строка', 10));

// Задача 2
function checkPalindrome(strokeIsPalindrome) {
  strokeIsPalindrome = strokeIsPalindrome.toLowerCase();
  return strokeIsPalindrome === strokeIsPalindrome.split('').reverse().join('');
}
checkPalindrome();
// console.log(checkPalindrome('топот'));
// console.log(checkPalindrome('ДовОд'));
// console.log(checkPalindrome('кекс'));

// Задача 3
function extractNumber (string) {
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }
  return parseInt(result,10);
}
extractNumber();
// console.log(extractNumber('2023 год'));            // 2023
// console.log(extractNumber('ECMAScript 2022'));     // 2022
// console.log(extractNumber('1 кефир, 0.5 батона')); // 105
// console.log(extractNumber('агент 007'));           // 7
// console.log(extractNumber('а я томат'));           // NaN

// Задача 4
function myPadStart(string, minLength, pad) {
  const actualPad = minLength - string.length;
  if (actualPad <= 0) {
    return string;
  }
  return pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
}
myPadStart ();
// console.log(myPadStart('1', 2, '0'));      // '01'
// console.log(myPadStart('1', 4, '0'));      // '0001'
// console.log(myPadStart('q', 4, 'werty'));  // 'werq'
// console.log(myPadStart('q', 4, 'we'));     // 'wweq'
// console.log(myPadStart('qwerty', 4, '0')); // 'qwerty'

