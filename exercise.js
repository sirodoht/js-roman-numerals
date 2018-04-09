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
  var number = 0;
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
    if (nextLetter && ROMAN_TO_DIGIT[nextLetter] > ROMAN_TO_DIGIT[currentLetter]) {}
  }
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
  console.log('romanNumber1.toInt():', romanNumber1.toInt());
  // if (romanNumber1.toInt() !== 20) {
  //   throw new Error();
  // }
  // if (romanNumber1.toString() !== 'XX') {
  //   throw new Error();
  // }
};

testRoman();
