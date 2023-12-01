const path = require("path");
const inputArray = require("../inputArray");

const inputFile = path.resolve(__dirname, "input.txt");
const data = inputArray(inputFile);

function pullOutNumbers(str) {
  //  The match method in JavaScript, when used with a global flag g in the regular expression, returns an array containing all the matches. In your case, str.match(/\d+/g) is looking for one or more digits (\d+) globally (g) in the string str.
  //  For each group of one or more digits it finds, it adds an element to the array. So if your string is "a1b2c3d4e5f", the match method will return ["1", "2", "3", "4", "5"].
  //  If you want to get an array of all individual digits, you should use \d (without the +) in your regular expression. This will match a single digit at a time. So str.match(/\d/g) on "a1b2c3d4e5f" will return ["1", "2", "3", "4", "5"].
  const digits = str.match(/\d/g);

  if (digits.length === 1) {
    return parseInt(digits[0] + digits[0], 10);
  }
  return parseInt(digits[0] + digits[digits.length - 1], 10);
}

function partOne(data) {
  let total = 0;
  for (let line of data) {
    total += pullOutNumbers(line);
  }
  return total;
}

const numberWords = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

// solved the example problem with this, but there are some weird edge cases
// getCalibrationValue => replaces all occurrences of number words with their digit equivalent
function getCalibrationValue(str) {
  for (let word in numberWords) {
    const regex = new RegExp(
      "\\b(" + Object.keys(numberWords).join("|") + ")\\b",
      "gi"
    );
    str = str.replace(regex, (match) => numberWords[match.toLowerCase()]);
    const digits = str.match(/\d/g);
    str = str.replace(regex, numberWords[word]);

    if (!digits) {
      return 0;
    }
    if (digits.length === 1) {
      return parseInt(digits[0] + digits[0], 10);
    }
    return parseInt(digits[0] + digits[digits.length - 1], 10);
  }
}

function partTwoTwo(data) {
  // loops over an array of strings (data), but for each string, it directly calls getCalibrationValue and adds the returned value to a total. It then returns this total.
  let total = 0;
  for (let line of data) {
    const value = getCalibrationValue(line);
    console.log(`Processing line: ${line}, value: ${value}`);
    total += value;
  }
  console.log(`Total: ${total}`);
  return total;
}

const getCalibrationTotal = (values) => {
  // For each array, it multiplies the first number by 10 and adds the last number. It then sums up all these results to get a total.
  return values.reduce(
    (sum, current) => sum + current.at(0) * 10 + current.at(-1),
    0
  );
};

function partTwo(data) {
  const letterNumbers = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  const numbers = data.map((line) =>
    [...line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)]
      .map((match) => match[1])
      .map((n) => (/\d/.test(n) ? Number(n) : letterNumbers.indexOf(n) + 1))
  );

  //   For each string, it finds all occurrences of digits or spelled out numbers (from "one" to "nine"). It then converts these matches into actual numbers (with spelled out numbers being converted to their numeric equivalents). The result is an array of arrays of numbers.
  console.log(getCalibrationTotal(numbers));
  return getCalibrationTotal(numbers);
}
module.exports = { partOne, partTwo, pullOutNumbers };
