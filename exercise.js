testRoman = function () {
  var romanNumber1 = new RomanNumber('XX');
  if (romanNumber1.toInt() !== 20) {
    throw new Error();
  }
  if (romanNumber1.toString() !== 'XX') {
    throw new Error();
  }
};

testRoman();
