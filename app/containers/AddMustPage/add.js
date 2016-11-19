import { post, get } from 'utils/request';
import { combineDateTime } from 'utils/time';

const BRANDS_URL = '/api/Brands';
const DRINK_URL = '/api/Players/me/drinks';
const RULES_URL = '/api/Rules';

export function getBrands() {
  return get(BRANDS_URL).then(({ data }) => data);
}

export function sendDrink(formData) {
  const {
    brand,
    amount,
    date,
    time,
  } = formData.toJS();
  return post(DRINK_URL, { brand, amount, date: combineDateTime(date, time) });
}

export function getRules() {
  return get(RULES_URL)
  .then(({ data }) => data)
  .then((rules) => {
    let rule;
    if (Array.isArray(rules)) {
      rule = rules.find(findCurrentYear) || rules[rules.length - 1];
    } else {
      rule = rules;
    }
    const { startDate, endDate } = rule;
    return Object.assign({}, rule, { startDate: new Date(startDate), endDate: new Date(endDate) });
  });
}

function findCurrentYear(elem) {
  return new Date().getFullYear() === elem.year;
}
