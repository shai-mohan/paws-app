export const cats = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  url: `https://cataas.com/cat/orange?width=400&height=500&random=${i}`,
}));