import { getTimestamp, HEADERS_JSON } from "./utilIoT.js";

/** Clase para conectarse a la base de datos. */
export class ProxyHistorial {
  /** @param {string} url URL del servidor. */
  constructor(url) {
    /** @private */
    this._url = url;
  }
  /**
   * @param {number} valor
   * @returns {string} texto de error. */
  async add(valor) {
    try {
      const json = this._creaJson(valor);
      const respuesta = await fetch(this._url, {
        method: "POST",
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
    const timestamp = getTimestamp();
    const estructura = {
      fields: {
        dispositivoId: { stringValue: dispositivoId },
        valor: { integerValue: valor },
        timestamp: { timestampValue: timestamp }
      }
    };
    return JSON.stringify(estructura);
  }
}