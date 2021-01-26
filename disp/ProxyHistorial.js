import {
  getTimestamp,
  HEADERS_JSON
} from "./utilIoT.js";

/** Clase para conectarse a la
 * base de datos. */
export class ProxyHistorial {
  /**
   * @param {string} dispositivoId
   *  id del dispositivo.
   * @param {string} url URL del
   *  servidor. */
  constructor(dispositivoId,
    url) {
    /** @private */
    this._dispositivoId =
      dispositivoId;
    /** @private */
    this._url = url;
  }
  /**
   * @param {number} valor
   * @returns {
      Promise<string>} texto de
   * error. */
  async add(valor) {
    let error = "";
    try {
      const json =
        this._creaJson(valor);
      const res =
        await fetch(this._url, {
          method: "POST",
          body: json,
          headers: HEADERS_JSON,
        });
      if (!res.ok) {
        error = res.statusText;
      }
    } catch (e) {
      return e.message;
    }
    return error;
  }
  /**
   * @private
   * @param {number} valor 
   * @returns {string} */
  _creaJson(valor) {
    const ts = getTimestamp();
    const doc = {
      fields: {
        dispositivoId: {
          stringValue:
            this._dispositivoId
        },
        valor: {
          integerValue: valor
        },
        timestamp: {
          timestampValue: ts
        }
      }
    };
    return JSON.stringify(doc);
  }
}