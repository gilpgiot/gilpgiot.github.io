import { InfoValor } from "../js/InfoValor.js";
import { envíaJson, MÉTODO_CAMBIOS } from "./utilIoT.js";

export class DaoEntradaDispositivo {
  /** @param {string} url */
  constructor(url) {
    this._url = url;
  }
  /**
   * @param {InfoValor} modelo
   * @returns {Promise<void>}
   */
  async modifica(modelo) {
    modelo.valida();
    const valor = { fields: { VALOR: { integerValue: modelo.valor } } };
    const json = JSON.stringify(valor);
    await envíaJson(this._url, MÉTODO_CAMBIOS, json);
  }
}