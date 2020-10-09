import { DaoEntradaMóvil } from "./DaoEntradaMovil.js";
import { DaoHistorialMóvil } from "./DaoHistorialMovil.js";
import { DaoSalidaMóvil } from "./DaoSalidaMovil.js";
import { InfoValor } from "./InfoValor.js";

export class CtrlHistorial {
  /** @param {DaoHistorialMóvil} daoHistorial */
  constructor(daoHistorial) {
    this._daoHistorial = daoHistorial;
  }
  async consultaHistorial() {
    return this._daoHistorial.consulta();
  }
}