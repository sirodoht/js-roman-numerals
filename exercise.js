var ROMAN_ELEMENTS = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

function RomanNumber(num) {
  if (Number.isInteger(num)) {
    this.number = num;
    this.roman = RomanNumber.convertToRoman(num);
  } else { // check if valid roman
    this.number = RomanNumber.convertToNumber(num);
    this.roman = num;
  }
}

RomanNumber.isValidRoman = function (numString) {
  for (var i = 0; i < numString.length; i++) {
    if (ROMAN_ELEMENTS.indexOf(numString[i].toUpperCase()) === -1) {
      return false;
    }
  }
  return true;
}

testRoman = function () {
  console.log(RomanNumber.isValidRoman('s'));
  console.log(RomanNumber.isValidRoman('C'));
  console.log(RomanNumber.isValidRoman('X'));
  // var romanNumber1 = new RomanNumber('XX');
  // if (romanNumber1.toInt() !== 20) {
  //   throw new Error();
  // }
  // if (romanNumber1.toString() !== 'XX') {
  //   throw new Error();
  // }
};

testRoman();
