import { TIMEOUT_SEC } from './config';
import { async } from 'regenerator-runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export async function getJSON(url) {
  console.log(url);

  try {
    const respones = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await respones.json();
    if (!respones.ok) throw new Error(`${data.message} - ${respones.status}`);
    return data;
  } catch (error) {
    throw error;
  }
}
