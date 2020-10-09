import { CtrlMóvil } from "./CtrlMovil.js";
import { DaoEntradaMóvil } from "./DaoEntradaMovil.js";
import { DaoHistorialMóvil } from "./DaoHistorialMovil.js";
import { DaoSalidaMóvil } from "./DaoSalidaMovil.js";

/** Usa el patrón Singleton. */
export class FábricaMóvil {
  constructor() {
    // @ts-ignore
    const firestore = firebase.firestore();
    this.daoEntrada = new DaoEntradaMóvil(firestore);
    this.daoSalida = new DaoSalidaMóvil(firestore);
    this.daoHistorial = new DaoHistorialMóvil(firestore);
    this.ctrlMóvil =
      new CtrlMóvil(this.daoEntrada, this.daoSalida, this.daoHistorial);
  }
}
FábricaMóvil.instancia = Object.freeze(new FábricaMóvil());