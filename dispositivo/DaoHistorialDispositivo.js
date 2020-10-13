import { valida } from "../lib/util.js";
import { envíaJson, getTimestamp, MÉTODO_AGREGA } from "./utilIoT.js";

export class DaoHistorialDispositivo {
  /** 
   * @param {string} idDisp
   * @param {string} url */
  constructor(idDisp,url) {
    this._idDisp = idDisp;
    this._url = url;
  }
  /**
   * @param {number} valor
   * @returns {Promise<void>}
   */
  async agrega(valor) {
    valida(valor !== null && valor !== undefined && !isNaN(valor),
      "Falta el valor de la entrada.");
    const timestamp = getTimestamp();
    const historial = {
      fields: {
        DISP_ID: { stringValue: this._idDisp },
        HIST_TS: { timestampValue: timestamp },
        VALOR: { integerValue: valor }
      }
    };
    const json = JSON.stringify(historial);
    await envíaJson(this._url, MÉTODO_AGREGA, json);
  }
}