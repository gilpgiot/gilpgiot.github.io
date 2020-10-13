import { DaoHistorialMóvil } from "./DaoHistorialMovil.js";

export class CtrlHistorial {
  /** @param {DaoHistorialMóvil} daoHistorial */
  constructor(daoHistorial) {
    this._daoHistorial = daoHistorial;
  }
  async consultaHistorial() {
    return this._daoHistorial.consulta();
  }
}