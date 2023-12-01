const { partOne, partTwo, pullOutNumbers } = require(".");
const path = require("path");
const inputArray = require("../inputArray");
const realFile = path.resolve(__dirname, "input.txt");
const realData = inputArray(realFile);
const sample = path.resolve(__dirname, "sample.txt");
const sample2 = path.resolve(__dirname, "sample2.txt");
const sampleData = inputArray(sample);
const sampleData2 = inputArray(sample2);

describe("pullOutNumber function", () => {
  it("should pull out 2 digits and concat them", () => {
    expect(pullOutNumbers("abc123def456ghi")).toBe(16);
  });
});

describe("partOne", () => {
  it("should add the sum of all the pulled out numbers", () => {
    expect(partOne(sampleData)).toBe(142);
    expect(partOne(realData)).toBe(54990);
  });
});

describe("partTwo", () => {
  it("should add the sum of all the pulled out numbers, string numbers and reg numbers", () => {
    // expect(partTwo(sampleData2)).toBe(281);
    expect(partTwo(realData)).toBe(54489);
  });
});
