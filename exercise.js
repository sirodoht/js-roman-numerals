var ROMAN_ELEMENTS = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

var ROMAN_TO_DIGIT = {
  'I': 1,
  'V': 5,
  'X': 10,
  'L': 50,
  'C': 100,
  'D': 500,
  'M': 1000,
};
// MCMLIII

function RomanNumber(num) {
  if (Number.isInteger(num)) {
    this.number = num;
    // this.roman = RomanNumber.toString(num);
  } else if (RomanNumber.isValid(num)) {
    // this.number = RomanNumber.toInt(num);
    this.roman = num;
  } else {
    throw new Error('invalid value');
  }
}

RomanNumber.prototype.toInt = function () {
  console.log('toInt:', this.roman);
  var number = 0;
  var doubleLetter = false;
  for (var i = 0; i < this.roman.length; i++) {
    var currentLetter = this.roman.charAt(i);
    var nextLetter = this.roman.charAt(i + 1);
    if (i >= this.roman.length - 1) {
      nextLetter = '';
    }
    console.log('currentLetter:', currentLetter);
    console.log('nextLetter:', nextLetter);
    console.log('ROMAN_TO_DIGIT[nextLetter]:', ROMAN_TO_DIGIT[nextLetter]);
    console.log('ROMAN_TO_DIGIT[currentLetter]:', ROMAN_TO_DIGIT[currentLetter]);
    if (nextLetter && ROMAN_TO_DIGIT[nextLetter] < ROMAN_TO_DIGIT[currentLetter]) {
      number += ROMAN_TO_DIGIT[currentLetter];
    }
    if (doubleLetter) {
      var previousLetter = this.roman.charAt(i - 1);
      console.log('ROMAN_TO_DIGIT[currentLetter] - ROMAN_TO_DIGIT[previousLetter]:', ROMAN_TO_DIGIT[currentLetter] - ROMAN_TO_DIGIT[previousLetter]);
      number += (ROMAN_TO_DIGIT[currentLetter] - ROMAN_TO_DIGIT[previousLetter]);
      doubleLetter = false;
    }
    if (nextLetter && ROMAN_TO_DIGIT[nextLetter] > ROMAN_TO_DIGIT[currentLetter]) {
      doubleLetter = true;
    }
    if (!nextLetter) {
      number += ROMAN_TO_DIGIT[currentLetter];
    }
    console.log('sum now:', number);
    console.log('');
  }
  return number;
}

RomanNumber.isValid = function (numString) {
  for (var i = 0; i < numString.length; i++) {
    if (ROMAN_ELEMENTS.indexOf(numString[i].toUpperCase()) === -1) {
      return false;
    }
  }
  return true;
}

testRoman = function () {
  // console.log(RomanNumber.isValid('s'));
  // console.log(RomanNumber.isValid('C'));
  // console.log(RomanNumber.isValid('X'));
  var romanNumber1 = new RomanNumber('XI');
  if (romanNumber1.toInt() !== 11) {
    throw new Error();
  }
  var romanNumber2 = new RomanNumber('CDXXIX');
  console.log('romanNumber2.toInt():', romanNumber2.toInt());
  // if (romanNumber2.toInt() !== 429) {
  //   throw new Error();
  // }
  // if (romanNumber1.toString() !== 'XX') {
  //   throw new Error();
  // }
};

testRoman();
