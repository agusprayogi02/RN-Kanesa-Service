import {BASE_URL} from './Config';

async function getFetch(url) {
  try {
    let response = await fetch(BASE_URL + url);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export {getFetch};
