import { DaoEntradaMóvil } from "./DaoEntradaMovil.js";
import { DaoSalidaMóvil } from "./DaoSalidaMovil.js";
import { InfoValor } from "./InfoValor.js";

export class CtrlMóvil {
  /** @param {string} idDisp
   * @param {(error: Error) => void} callbackError
   * @param {(modelo: InfoValor) => void} callbackEntrada
   * @param {DaoEntradaMóvil} daoEntrada
   * @param {DaoSalidaMóvil} daoSalida
   *  */
  constructor(idDisp, callbackError, callbackEntrada, daoEntrada, daoSalida) {
    this._idDisp = idDisp;
    this._callbackError = callbackError;
    this._callbackEntrada = callbackEntrada;
    this._daoEntrada = daoEntrada;
    this._daoSalida = daoSalida;
  }
  async setup() {
    this._daoEntrada
      .lee(this._idDisp, this._callbackError, this._callbackEntrada);
    return this._daoSalida.busca(this._idDisp);
  }
  /** @param {number} valor */
  async modificaSalida(valor) {
    const modelo = new InfoValor({ id: this._idDisp, valor });
    await this._daoSalida.modifica(modelo);
  }
}