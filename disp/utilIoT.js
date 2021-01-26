export const HEADERS_JSON = {
  "Content-Type":
    "application/json"
};
export function getTimestamp() {
  const date = new Date();
  return date.toJSON();
}
/**
 * @param {string} proyecto
 * @param {string} colección */
export function urlDeColección(
  proyecto, colección) {
  return "https://firestore." +
    "googleapis.com/v1/" +
    "projects/" + proyecto +
    "/databases/(default)/" +
    "documents/" + colección;
}
/**
 * @param {string} proyecto
 * @param {string} colección
 * @param {string} id
 */
export function urlDeDocumento(
  proyecto, colección, id) {
  return `${urlDeColección(
    proyecto, colección)}/${id}`;
}