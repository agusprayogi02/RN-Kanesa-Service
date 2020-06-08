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

async function postLogin(url, data) {
  try {
    let response = await fetch(BASE_URL + url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export {getFetch, postLogin};
