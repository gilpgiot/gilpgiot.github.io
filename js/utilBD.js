/** @param {{ exists: boolean; data: () => any; id: any; }} doc
 * @returns {number}
 */
export function leeValor(doc) {
  if (doc.exists) {
    const data = doc.data();
    return data.VALOR || 0;
  } else {
    return 0;
  }
}