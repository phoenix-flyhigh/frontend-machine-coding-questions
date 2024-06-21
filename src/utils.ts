const RANDOM_COLORS = [
  "bg-pink-500",
  "bg-amber-500",
  "bg-orange-500",
  "bg-indigo-500",
  "bg-lime-800",
];

export const getRandomColor = () =>
  RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];
