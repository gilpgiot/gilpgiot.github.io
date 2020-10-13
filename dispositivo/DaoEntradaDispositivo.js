import { valida } from "../lib/util.js";
import { envíaJson, MÉTODO_CAMBIOS } from "./utilIoT.js";

export class DaoEntradaDispositivo {
  /** @param {string} url */
  constructor(url) {
    this._url = url;
  }
  /**
   * @param {number} valor
   * @returns {Promise<void>}
   */
  async modifica(valor) {
    valida(valor !== null && valor !== undefined && !isNaN(valor),
      "Falta el valor de la entrada.");
    const infoEntrada = { fields: { VALOR: { integerValue: valor } } };
    const json = JSON.stringify(infoEntrada);
    await envíaJson(this._url, MÉTODO_CAMBIOS, json);
  }
}