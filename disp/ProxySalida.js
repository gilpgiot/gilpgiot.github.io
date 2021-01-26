import {
  ResInt
} from "./ResInt.js";

/** Clase para conectarse a la
 * base de datos. */
export class ProxySalida {
  /**
   * @param {string} url URL del
   *  servidor. */
  constructor(url) {
    /** @private */
    this._url = url;
  }
  /** @returns {Promise<ResInt>}
   */
  async get() {
    let error = "";
    let valor = 0;
    try {
      const res =
        await fetch(this._url);
      if (res.ok) {
        valor = await this.
          _leeValor(res);
      } else if (res.status !==
        404) {
        error = res.statusText;
      }
    } catch (e) {
      error = e.message;
    }
    return new ResInt(
      valor, error);
  }
  /**
   * @private
   * @param {Response} res 
   * @returns {Promise<number>} */
  async _leeValor(res) {
    const json = await res.json();
    if (json.fields.valor &&
      json.fields.valor.
        integerValue) {
      return parseInt(
        json.fields.valor.
          integerValue,
        10);
    } else {
      return 0;
    }
  }
}