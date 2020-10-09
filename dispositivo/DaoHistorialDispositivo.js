import { InfoHistorial } from "../js/InfoHistorial.js";
import { envíaJson, MÉTODO_AGREGA } from "./utilIoT.js";

export class DaoHistorialDispositivo {
  /** @param {string} url */
  constructor(url) {
    this._url = url;
  }
  /**
   * @param {InfoHistorial} modelo
   * @returns {Promise<void>}
   */
  async agrega(modelo) {
    const historial = {
      fields: {
        DISP_ID: { stringValue: modelo.dispositivo },
        HIST_TS: { timestampValue: modelo.timestamp },
        VALOR: { integerValue: modelo.valor }
      }
    };
    const json = JSON.stringify(historial);
    await envíaJson(this._url, MÉTODO_AGREGA, json);
  }
}