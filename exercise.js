var testChars = ['I', 'V', 'X', 'C'],

  isItTen = function (num) {
    return num.toLowerCase() === 'x';
  },

  isItFive = function (num) {
    return num.toLowerCase() === 'v';
  },

  testRoman = function () {
    testChars.forEach(function (str) {
      console.log('Is %s 10? ', str, (isItTen(str) ? 'Yes' : 'No'));
      console.log('Is %s 5? ', str, (isItFive(str) ? 'Yes' : 'No'));
    });
  };

testRoman();
