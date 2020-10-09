const HEADERS_JSON = { "Content-Type": "application/json" };
export async function envíaJson(url, método, json) {
  const resp = await fetch(url, {
    method: método,
    body: json,
    headers: HEADERS_JSON,
  });
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
}
export function getTimestamp() {
  const date = new Date();
  return date.toJSON();
}
export function urlDeColección(proyecto, colección) {
  return "https://firestore.googleapis.com/v1/projects/" +
    proyecto + "/databases/(default)/documents/" + colección;
}
export function urlDeDocumento(proyecto, colección, id) {
  return `${urlDeColección(proyecto, colección)}/${id}`;
}
/** @param {number} milis */
export async function espera(milis) {
  return new Promise(resolve => {
    setTimeout(resolve, milis);
  });
}
