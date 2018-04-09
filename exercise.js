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
  if (!(this instanceof RomanNumber)) {
    return new RomanNumber(num);
  }

  if (!num) {
    throw new Error('invalid value');
  }
  if (Number.isInteger(num)) {
    if (num < 1 || num > 3999) {
      throw new Error('invalid range');
    }
    this.number = num;
  } else if (RomanNumber.isValid(num)) {
    this.roman = num;
  } else {
    throw new Error('invalid value');
  }
}

RomanNumber.prototype.toInt = function () {
  if (this.number) {
    return this.number;
  }

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
  if (this.roman) {
    return this.roman;
  }

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

  if (RomanNumber.isValid(roman)) {
    return roman;
  } else {
    console.log('roman invalid:', roman);
    throw new Error('invalid value');
  }
}

RomanNumber.isValid = function (numString) {
  // check if all letters are the roman ones
  for (var i = 0; i < numString.length; i++) {
    if (ROMAN_ELEMENTS.indexOf(numString.charAt(i).toUpperCase()) === -1) {
      return false;
    }
  }

  // count roman letter appears individually
  var lettersAppearance = {
    'I': 0,
    'V': 0,
    'X': 0,
    'L': 0,
    'C': 0,
    'D': 0,
    'M': 0,
  };
  numString.split('').forEach(function (letter) {
    lettersAppearance[letter]++;
  });

  // check if letters appear more than 4 times
  var keys = Object.keys(lettersAppearance);
  for (var i = 0; i < keys.length; i++) {
    if (lettersAppearance[keys[i]] > 4) {
      return false;
    }
  }

  // check if a letter appears more than 3 times consecutively
  var previousLetter = '';
  var consecutiveTimes = 0;
  for (var i = 0; i < numString.length; i++) {
    var letter = numString.charAt(i);
    if (!previousLetter) {
      previousLetter = letter;
      consecutiveTimes++;
    } else {
      if (letter === previousLetter) {
        consecutiveTimes++;
      } else {
        previousLetter = letter;
        consecutiveTimes = 0;
      }
    }
    if (consecutiveTimes > 3) {
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
  // check null
  try {
    new RomanNumber(null); // this should throw
    throw new Error('test case for null failed'); // this should never run
  } catch (err) {
    if (err.message !== 'invalid value') {
      throw new Error('test case for null failed');
    }
  }

  // check empty
  try {
    new RomanNumber(''); // this should throw
    throw new Error('test case for empty failed'); // this should never run
  } catch (err) {
    if (err.message !== 'invalid value') {
      throw new Error('test case for empty failed');
    }
  }

  // test 0
  try {
    new RomanNumber(0); // this should throw
    throw new Error('test case for zero failed'); // this should never run
  } catch (err) {
    if (err.message !== 'invalid value') {
      throw new Error('test case for zero failed');
    }
  }

  // check range <1
  try {
    new RomanNumber(-1023); // this should throw
    throw new Error('test case for range failed'); // this should never run
  } catch (err) {
    if (err.message !== 'invalid range') {
      throw new Error('test case for range failed');
    }
  }

  // check range >3999
  try {
    new RomanNumber(5678); // this should throw
    throw new Error('test case for range failed'); // this should never run
  } catch (err) {
    if (err.message !== 'invalid range') {
      throw new Error('test case for range failed');
    }
  }

  // check constructor without 'new' keyword
  var romanNumberWithoutNew = RomanNumber('XX');
  if (romanNumberWithoutNew.toInt() != 20) {
    throw new Error('romanNumberWithoutNew test case failed');
  }
  if (romanNumberWithoutNew.toString() != 'XX') {
    throw new Error('romanNumberWithoutNew test case failed');
  }

  // check invalid romans
  var invalidCases = ['10000', 'CD1X', 'error', 'MMMMCMXCIX', 'MMMMDMXCIX'];
  invalidCases.forEach(function (item) {
    if (RomanNumber.isValid(item)) {
      throw new Error('valid test case failed:', item);
    }
  })

  // check string number case
  try {
    new RomanNumber('1473'); // this should throw
    throw new Error('test case for string number failed'); // this should never run
  } catch (err) {
    if (err.message !== 'invalid value') {
      throw new Error('test case for string number failed');
    }
  }

  // check nominal test cases for .toInt() method
  var romanNumbers = {
    'I': 1,
    'III': 3,
    'IV': 4,
    'V': 5,
    'XI': 11,
    'CDXXIX': 429,
    'MCDLXXXII': 1482,
    'MCMLXXX': 1980,
  };
  Object.keys(romanNumbers).forEach(function (item) {
    var number = new RomanNumber(item);
    if (number.toInt() !== romanNumbers[item]) {
      throw new Error('.toInt() failed');
    }
  });

  // check nominal test cases for .toString() method
  var romanNumbersInverse = {
    '1': 'I',
    '3': 'III',
    '4': 'IV',
    '5': 'V',
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

  // check example test case from pdf
  var romanNumber1 = new RomanNumber('XX');
  var romanNumber2 = new RomanNumber(40);
  if (romanNumber1.toInt() != 20) {
    throw new Error('romanNumber1 test case failed');
  }
  if (romanNumber1.toString() != 'XX') {
    throw new Error('romanNumber1 test case failed');
  }
  if (romanNumber2.toInt() != 40) {
    throw new Error('romanNumber2 test case failed');
  }
  if (romanNumber2.toString() != 'XL') {
    throw new Error('romanNumber2 test case failed');
  }
};

testRoman();
