var ROMAN_ELEMENTS = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

var ROMAN_TO_DIGIT = {
  'I': 1,
  'IV': 4,
  'V': 5,
  'IX': 9,
  'X': 10,
  'XL': 40,
  'L': 50,
  'XC': 90,
  'C': 100,
  'CD': 400,
  'D': 500,
  'CM': 900,
  'M': 1000,
};

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
    if (!doubleLetter && nextLetter && ROMAN_TO_DIGIT[nextLetter] <= ROMAN_TO_DIGIT[currentLetter]) {
      number += ROMAN_TO_DIGIT[currentLetter];
    }
    if (doubleLetter) {
      var previousLetter = this.roman.charAt(i - 1);
      console.log('ROMAN_TO_DIGIT[currentLetter] - ROMAN_TO_DIGIT[previousLetter]:', ROMAN_TO_DIGIT[currentLetter] - ROMAN_TO_DIGIT[previousLetter]);
      number += (ROMAN_TO_DIGIT[currentLetter] - ROMAN_TO_DIGIT[previousLetter]);
      doubleLetter = false;
    } else if (!nextLetter) {
      console.log('adding:', ROMAN_TO_DIGIT[currentLetter]);
      number += ROMAN_TO_DIGIT[currentLetter];
    }
    if (nextLetter && ROMAN_TO_DIGIT[nextLetter] > ROMAN_TO_DIGIT[currentLetter]) {
      doubleLetter = true;
    }
    console.log('sum now:', number);
    console.log('');
  }
  return number;
}

RomanNumber.prototype.toString = function () {
  var roman = '';
  var done = false;

  var letterDict = {
    1000: 'M',
    100: 'C',
    10: 'X',
    1: 'I',
  };

  console.log('this.number:', this.number);

  var modRatio = 10000;
  var divideRatio = 1000;
  var letter = 'M';
  while (!done) {
    console.log('modRatio:', modRatio);
    console.log('divideRatio:', divideRatio);
    console.log('letter:', letter);

    var scale = Math.floor((this.number % modRatio) / divideRatio);
    console.log('scale:', scale);
    if (scale <= 3) {
      for (var i = 0; i < scale; i++) {
        roman += letter;
      }
    } else if (scale === 4) {

    } else if (scale === 5) {

    } else if (scale > 5 && scale < 9) {
      console.log('scale 6, 7, 8 calc');
      var scaleMultiplied = scale * divideRatio;

    } else if (scale === 9) {
      console.log('scale 9 calc');
      var scaleMultiplied = scale * divideRatio;

      var letterCombination = '';
      var keys = Object.keys(ROMAN_TO_DIGIT);
      for (var i = 0; i < keys.length; i++) {
        if (scaleMultiplied === ROMAN_TO_DIGIT[keys[i]]) {
          letterCombination = keys[i];
          break;
        }
      }
      roman += letterCombination;
    }

    modRatio /= 10;
    divideRatio /= 10;
    letter = letterDict[divideRatio];
    if (letter === 'X') {
      done = true;
    }
    console.log('');
  }

  console.log('final roman:', roman);
}

RomanNumber.isValid = function (numString) {
  for (var i = 0; i < numString.length; i++) {
    if (ROMAN_ELEMENTS.indexOf(numString[i].toUpperCase()) === -1) {
      return false;
    }
  }
  return true;
}

RomanNumber.getRoman = function (number) {
  var keys = Object.keys(ROMAN_TO_DIGIT);
  for (var i = 0; i < keys.length; i++) {
    if (number === ROMAN_TO_DIGIT[keys[i]]) {
      return keys[i];
    }
  }
}

testRoman = function () {
  // console.log(RomanNumber.isValid('s'));
  // console.log(RomanNumber.isValid('C'));
  // console.log(RomanNumber.isValid('X'));

  // var romanNumbers = {
  //   'XI': 11,
  //   'CDXXIX': 429,
  //   'MCDLXXXII': 1482,
  //   'MCMLXXX': 1980,
  //   'MMMMCMXCIX': 4999,
  //   'MMMMDMXCIX': 4599,
  // };
  // Object.keys(romanNumbers).forEach(function (item) {
  //   var number = new RomanNumber(item);
  //   if (number.toInt() !== romanNumbers[item]) {
  //     throw new Error('.toInt() failed');
  //   }
  // });

  var romanNumber1 = new RomanNumber(1968);
  console.log('1968 toString:', romanNumber1.toString());
};

testRoman();
