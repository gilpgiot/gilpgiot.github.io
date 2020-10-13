import { CtrlHistorial } from "./CtrlHistorial.js";
import { CtrlMóvil } from "./CtrlMovil.js";
import { DaoEntradaMóvil } from "./DaoEntradaMovil.js";
import { DaoHistorialMóvil } from "./DaoHistorialMovil.js";
import { DaoSalidaMóvil } from "./DaoSalidaMovil.js";

/** Usa el patrón Singleton. */
export class FábricaMóvil {
  /** @param {string} idDisp
   * @param {(valor: number) => void} muestraEntrada
   * @param {(valor: number) => void} muestraSalida
   * @param {(error: Error) => void} muestraError
   */
  constructor(idDisp, muestraEntrada, muestraSalida, muestraError) {
    // @ts-ignore
    const firestore = firebase.firestore();
    this.daoEntrada = new DaoEntradaMóvil(firestore, idDisp);
    this.daoSalida = new DaoSalidaMóvil(firestore, idDisp);
    this.daoHistorial = new DaoHistorialMóvil(firestore);
    this.ctrlMóvil = new CtrlMóvil(idDisp, muestraEntrada, muestraSalida,
       muestraError, this.daoEntrada, this.daoSalida);
    this.ctrlHistorial = new CtrlHistorial(this.daoHistorial);
  }
}