import { DaoEntradaMóvil } from "./DaoEntradaMovil.js";
import { DaoHistorialMóvil } from "./DaoHistorialMovil.js";
import { DaoSalidaMóvil } from "./DaoSalidaMovil.js";
import { InfoValor } from "./InfoValor.js";

export class CtrlMóvil {
  /** @param {DaoEntradaMóvil} daoEntrada
   * @param {DaoSalidaMóvil} daoSalida
   * @param {DaoHistorialMóvil} daoHistorial */
  constructor(daoEntrada, daoSalida, daoHistorial) {
    this._daoEntrada = daoEntrada;
    this._daoSalida = daoSalida;
    this._daoHistorial = daoHistorial;
  }
  /** @param {string} id
   * @param {(error: Error) => void} callbackError
   * @param {(modelo: InfoValor) => void} callback */
  async setup(id, callbackError, callback) {
    this._daoEntrada.lee(id, callbackError, callback);
    return this._daoSalida.busca(id);
  }
  /** @param {InfoValor} infoValor */
  async modificaSalida(infoValor) {
    await this._daoSalida.modifica(infoValor);
  }
  async consultaHistorial() {
    return this._daoHistorial.consulta();
  }
}