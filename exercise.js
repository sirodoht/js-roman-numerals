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
  } else if (RomanNumber.isValid(num)) {
    this.roman = num;
  } else {
    throw new Error('invalid value');
  }
}

RomanNumber.prototype.toInt = function () {
  var number = 0;
  var doubleLetter = false;
  for (var i = 0; i < this.roman.length; i++) {
    var currentLetter = this.roman.charAt(i);
    var nextLetter = this.roman.charAt(i + 1);
    if (i >= this.roman.length - 1) {
      nextLetter = '';
    }
    if (!doubleLetter && nextLetter && ROMAN_TO_DIGIT[nextLetter] <= ROMAN_TO_DIGIT[currentLetter]) {
      number += ROMAN_TO_DIGIT[currentLetter];
    }
    if (doubleLetter) {
      var previousLetter = this.roman.charAt(i - 1);
      number += (ROMAN_TO_DIGIT[currentLetter] - ROMAN_TO_DIGIT[previousLetter]);
      doubleLetter = false;
    } else if (!nextLetter) {
      number += ROMAN_TO_DIGIT[currentLetter];
    }
    if (nextLetter && ROMAN_TO_DIGIT[nextLetter] > ROMAN_TO_DIGIT[currentLetter]) {
      doubleLetter = true;
    }
  }
  return number;
}

RomanNumber.prototype.toString = function () {
  var roman = '';
  var done = false;

  var letterDict = {
    1000: 'M',
    500: 'D',
    100: 'C',
    50: 'L',
    10: 'X',
    5: 'V',
    1: 'I',
  };

  var modRatio = 10000;
  var divideRatio = 1000;
  var letter = 'M';
  while (!done) {

    var scale = Math.floor((this.number % modRatio) / divideRatio);
    if (scale <= 3) {
      for (var i = 0; i < scale; i++) {
        roman += letter;
      }
    } else if (scale === 4) {
      var scaleMultiplied = scale * divideRatio;
      roman += RomanNumber.getRoman(scaleMultiplied);

    } else if (scale >= 5 && scale < 9) {
      var scaleMultiplied = scale * divideRatio;
      var halfScale = modRatio / 2;
      roman += RomanNumber.getRoman(halfScale);

      var copiesLeft = scale - 5;
      for (var i = 0; i < copiesLeft; i++) {
        roman += letter;
      }
    } else if (scale === 9) {
      var scaleMultiplied = scale * divideRatio;
      roman += RomanNumber.getRoman(scaleMultiplied);
    }

    if (letter === 'I') {
      done = true;
    }
    modRatio /= 10;
    divideRatio /= 10;
    letter = letterDict[divideRatio];
  }

  return roman;
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

  var romanNumbers = {
    'XI': 11,
    'CDXXIX': 429,
    'MCDLXXXII': 1482,
    'MCMLXXX': 1980,
    'MMMMCMXCIX': 4999,
    'MMMMDMXCIX': 4599,
  };
  Object.keys(romanNumbers).forEach(function (item) {
    var number = new RomanNumber(item);
    if (number.toInt() !== romanNumbers[item]) {
      throw new Error('.toInt() failed');
    }
  });

  var romanNumbersInverse = {
    '1945': 'MCMXLV',
    '1968': 'MCMLXVIII',
    '1473': 'MCDLXXIII',
    '2999': 'MMCMXCIX',
    '3000': 'MMM',
    '3999': 'MMMCMXCIX',
  };
  Object.keys(romanNumbersInverse).forEach(function (item) {
    var number = new RomanNumber(parseInt(item));
    if (number.toString() !== romanNumbersInverse[item]) {
      throw new Error('.toString() failed');
    }
  });

};

testRoman();
