export default (caption, checked = false) => `
  <input type="radio" id="filter-${caption}" name="filter" value="${caption}" ${checked ? `checked` : ``}>
  <label class="trip-filter__item" for="filter-${caption}">${caption}</label>`;
