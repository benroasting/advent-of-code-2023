import fs from "fs";

const maxCount = {
  red: 12,
  green: 13,
  blue: 14,
};

function partOne(file) {
  const lines = fs.readFileSync(file, "utf-8").trimEnd().split("\n");
  // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  return lines
    .map((line) => {
      return line
        .split(": ")[1]
        .split("; ")
        .map((set) => {
          const pulls = set.split(", ");
          return pulls.every((pull) => {
            const [count, color] = pull.split(" ");
            return count <= maxCount[color];
          });
        })
        .every((play) => play);
    })
    .reduce((sum, result, i) => {
      return result ? sum + (i + 1) : sum;
    }, 0);
}

// console.log("Part 1", partOne("./input.txt"));

function partTwo(file) {
  const lines = fs.readFileSync(file, "utf-8").trimEnd().split("\n");

  return lines
    .map((line) => {
      const maxCount = {
        red: 0,
        green: 0,
        blue: 0,
      };
      line
        .split(": ")[1]
        .split("; ")
        .forEach((set) => {
          const pulls = set.split(", ");
          return pulls.forEach((pull) => {
            const [count, color] = pull.split(" ");
            if (maxCount[color] < Number(count)) {
              maxCount[color] = Number(count);
            }
          });
        });
      console.log(maxCount);
      return maxCount.red * maxCount.green * maxCount.blue;
    })
    .reduce((sum, result) => sum + result);
}

console.log("Part 1", partTwo("./input.txt"));
