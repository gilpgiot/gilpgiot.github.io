import { CtrlHistorial } from "./CtrlHistorial.js";
import { CtrlMóvil } from "./CtrlMovil.js";
import { DaoEntradaMóvil } from "./DaoEntradaMovil.js";
import { DaoHistorialMóvil } from "./DaoHistorialMovil.js";
import { DaoSalidaMóvil } from "./DaoSalidaMovil.js";
import { InfoValor } from "./InfoValor.js";

const ID_DISP = "iot1";

/** Usa el patrón Singleton. */
export class FábricaMóvil {
  /**
   * @param {(error: Error) => void} callbackError
   * @param {(modelo: InfoValor) => void} callbackEntrada
   */
  constructor(callbackError, callbackEntrada) {
    // @ts-ignore
    const firestore = firebase.firestore();
    this.daoEntrada = new DaoEntradaMóvil(firestore);
    this.daoSalida = new DaoSalidaMóvil(firestore);
    this.daoHistorial = new DaoHistorialMóvil(firestore);
    this.ctrlMóvil = new CtrlMóvil(ID_DISP, callbackError, callbackEntrada,
      this.daoEntrada, this.daoSalida);
    this.ctrlHistorial = new CtrlHistorial(this.daoHistorial);
  }
  /**
   * @param {(error: Error) => void} callbackError
   * @param {(modelo: InfoValor) => void} callbackEntrada
   */
  static instancia(callbackError, callbackEntrada) {
    return new FábricaMóvil(callbackError, callbackEntrada);
  }
}