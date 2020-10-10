import { CtrlHistorial } from "./CtrlHistorial.js";
import { CtrlMóvil } from "./CtrlMovil.js";
import { DaoEntradaMóvil } from "./DaoEntradaMovil.js";
import { DaoHistorialMóvil } from "./DaoHistorialMovil.js";
import { DaoSalidaMóvil } from "./DaoSalidaMovil.js";
import { InfoValor } from "./InfoValor.js";

/** Usa el patrón Singleton. */
export class FábricaMóvil {
  /** @param {string} idDisp
   * @param {(error: Error) => void} callbackError
   * @param {(modelo: InfoValor) => void} callbackEntrada
   */
  constructor(idDisp, callbackError, callbackEntrada) {
    // @ts-ignore
    const firestore = firebase.firestore();
    this.daoEntrada = new DaoEntradaMóvil(firestore);
    this.daoSalida = new DaoSalidaMóvil(firestore);
    this.daoHistorial = new DaoHistorialMóvil(firestore);
    this.ctrlMóvil = new CtrlMóvil(idDisp, callbackError, callbackEntrada,
      this.daoEntrada, this.daoSalida);
    this.ctrlHistorial = new CtrlHistorial(this.daoHistorial);
  }
  /** @param {string} idDisp
   * @param {(error: Error) => void} callbackError
   * @param {(modelo: InfoValor) => void} callbackEntrada
   */
  static instancia(idDisp, callbackError, callbackEntrada) {
    return new FábricaMóvil(idDisp, callbackError, callbackEntrada);
  }
}