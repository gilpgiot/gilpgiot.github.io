import { HEADERS_JSON } from "./utilIoT.js";

/** Clase para conectarse a la base de datos. */
export class ProxyEntrada {
  /** @param {string} url URL del servidor. */
  constructor(url) {
    /** @private */
    this._url = url;
  }
  /**
   * @param {number} valor
   * @returns {string} texto de error. */
  async set(valor) {
    try {
      const json = this._creaJson(valor);
      const respuesta = await fetch(this._url, {
        method: "PATCH",
        body: json,
        headers: HEADERS_JSON,
      });
      if (respuesta.ok) {
        return "";
      } else {
        return respuesta.statusText;
      }
    } catch (e) {
      return e.message;
    }
  }
  /**
   * @private
   * @param {number} valor 
   * @returns {string} */
  _creaJson(valor) {
    const estructura = { fields: { valor: { integerValue: valor } } };
    return JSON.stringify(estructura);
  }
}