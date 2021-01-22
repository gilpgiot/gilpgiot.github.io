import { ResInt } from "./ResInt.js";

/** Clase para conectarse a la base de datos. */
export class ProxySalida {
  /** @param {string} url URL del servidor. */
  constructor(url) {
    /** @private */
    this._url = url;
  }
  /** @returns {ResInt} */
  async get() {
    let error = "";
    let valor = 0;
    try {
      const respuesta = await fetch(this._url);
      if (respuesta.ok) {
        valor = await this._leeValor(respuesta);
      } else if (respuesta.status !== 404) {
        error = respuesta.statusText;
      }
    } catch (e) {
      error = e.message;
    }
    return new ResInt(valor, error);
  }
  /**
   * @private
   * @param {Response} respuesta 
   * @returns {Promise<number>} */
  async _leeValor(respuesta) {
    const json = await respuesta.json();
    if (json.fields.valor && json.fields.valor.integerValue) {
      return parseInt(json.fields.valor.integerValue, 10);
    } else {
      return 0;
    }
  }
}