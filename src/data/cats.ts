export const cats = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  url: `https://cataas.com/cat?width=400&height=500&random=${i}`,
}));