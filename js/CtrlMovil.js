import { DaoEntradaMóvil } from "./DaoEntradaMovil.js";
import { DaoSalidaMóvil } from "./DaoSalidaMovil.js";

export class CtrlMóvil {
  /** @param {string} idDisp
   * @param {(valor: number) => void} muestraEntrada
   * @param {(valor: number) => void} muestraSalida
   * @param {(error: Error) => void} muestraError
   * @param {DaoEntradaMóvil} daoEntrada
   * @param {DaoSalidaMóvil} daoSalida
   */
  constructor(idDisp, muestraEntrada, muestraSalida, muestraError, daoEntrada,
    daoSalida) {
    this._idDisp = idDisp;
    this._muestraSalida = muestraSalida;
    this._muestraEntrada = muestraEntrada;
    this._muestraError = muestraError;
    this._daoEntrada = daoEntrada;
    this._daoSalida = daoSalida;
  }
  async setup() {
    try {
      this._daoEntrada.lee(this._muestraError, this._muestraEntrada);
      const salida = await this._daoSalida.busca();
      this._muestraSalida(salida);
    } catch (error) {
      this._muestraError(error);      
    }
  }
  /** @param {number} valor */
  async modificaSalida(valor) {
    try {
      await this._daoSalida.modifica(valor);      
    } catch (error) {
      this._muestraError(error);      
    }
  }
}