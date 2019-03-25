export default () => {
  return [...new Set([
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
};
