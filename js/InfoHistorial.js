/** @typedef {Object} ParamHistorial
 * @property {string} id
 * @property {string} dispositivo
 * @property {string} timestamp
 * @property {number} valor */
export class InfoHistorial {
  /** @param {ParamHistorial} param0 */
  constructor({ id, dispositivo, timestamp, valor }) {
    this.id = id;
    this.dispositivo = dispositivo;
    this.timestamp = timestamp;
    this.valor = valor;
  }
}