import { options, input } from "../common.mjs";

const games = input
  .map((line) => line.split(": ")[1])
  .map((line) => line.split("; "))
  .map((set) => set.split(", "))
  .map((set) => set.map((value) => value.split(" ")))
  .map((set) =>
    set.reduce((a, i) => Object.assign(a, { [i[1]]: parseInt(i[0]) }), {})
  );
console.log(games);

const check = (games, red, green, blue) => {
  return games
    .map((game, i) => {
      const r = game.filter((set) => set.red > red).length;
      const g = game.filter((set) => set.green > green).length;
      const b = game.filter((set) => set.blue > blue).length;
      return r || g || b ? 0 : i + 1;
    })
    .reduce((a, i) => a + i, 0);
};

console.log("Part 1", check(games, 12, 13, 14));
