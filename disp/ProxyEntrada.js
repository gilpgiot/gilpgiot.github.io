import {
  HEADERS_JSON
} from "./utilIoT.js";

/** Clase para conectarse a la
 * base de datos. */
export class ProxyEntrada {
  /**
   * @param {string} url URL del
   *  servidor. */
  constructor(url) {
    /** @private */
    this._url = url;
  }
  /**
   * @param {number} valor
   * @returns {
      Promise<string>} texto de
      error. */
  async set(valor) {
    let error = "";
    try {
      const json =
        this._creaJson(valor);
      const res =
        await fetch(this._url, {
          method: "PATCH",
          body: json,
          headers: HEADERS_JSON,
        });
      if (!res.ok) {
        error = res.statusText;
      }
    } catch (e) {
      error = e.message;
    }
    return error;
  }
  /**
   * @private
   * @param {number} valor 
   * @returns {string} */
  _creaJson(valor) {
    const doc = {
      fields: {
        valor: {
          integerValue: valor
        }
      }
    };
    return JSON.stringify(doc);
  }
}