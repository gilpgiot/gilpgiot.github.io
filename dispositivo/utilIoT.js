const HEADERS_JSON = { "Content-Type": "application/json" };
export const MÉTODO_AGREGA = "POST";
export const MÉTODO_CAMBIOS = "PATCH";
/**
 * @param {string} url
 * @param {string} método
 * @param {string} json
 */
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
/**
 * @param {string} proyecto
 * @param {string} colección
 */
export function urlDeColección(proyecto, colección) {
  return "https://firestore.googleapis.com/v1/projects/" +
    proyecto + "/databases/(default)/documents/" + colección;
}
/**
 * @param {string} proyecto
 * @param {string} colección
 * @param {string} id
 */
export function urlDeDocumento(proyecto, colección, id) {
  return `${urlDeColección(proyecto, colección)}/${id}`;
}
/** @param {number} milis */
export async function espera(milis) {
  return new Promise(resolve => {
    setTimeout(resolve, milis);
  });
}
