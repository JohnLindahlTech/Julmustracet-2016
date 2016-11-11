import { post, get } from '../../utils/request';

const BRANDS_URL = 'http://localhost:3000/api/Brands';
const DRINK_URL = 'http://localhost:3000/api/Players/me/drinks';

export function getBrands() {
  return get(BRANDS_URL);
}

export function sendDrink(formData) {
  return post(DRINK_URL, formData);
}
