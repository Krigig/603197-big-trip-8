export const filters = [...new Set([
  {
    name: `everything`,
    isChecked: true
  },
  {
    name: `future`,
    isChecked: false
  },
  {
    name: `past`,
    isChecked: false
  }
])];

export const sorting = [...new Set([
  {
    name: `Event`,
    isChecked: true,
    isSorting: true
  },
  {
    name: `Time`,
    isChecked: false,
    isSorting: true
  },
  {
    name: `Price`,
    isChecked: false,
    isSorting: true
  },
  {
    name: `Offers`,
    isChecked: false,
    isSorting: false
  },

])];
