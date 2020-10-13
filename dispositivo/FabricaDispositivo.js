import { CtrlDispositivo } from "./CtrlDispositivo.js";
import { DaoEntradaDispositivo } from "./DaoEntradaDispositivo.js";
import { DaoHistorialDispositivo } from "./DaoHistorialDispositivo.js";
import { DaoSalidaDispositivo } from "./DaoSalidaDispositivo.js";
import { urlDeColección, urlDeDocumento } from "./utilIoT.js";

const ID_PROYECTO = "gilpgiotx";

export class FábricaDispositivo {
  /** @param {string} idDisp
   * @param {() => boolean} sondeaSalida
   * @param {(valor: number) => void} muestraSalida
   * @param {() => number} recuperaEntrada
   * @param {(valor: Error) => void} muestraError
   */
  constructor(idDisp, sondeaSalida, muestraSalida, recuperaEntrada,
    muestraError) {
    const urlEntrada = urlDeDocumento(ID_PROYECTO, "ENTRADA", idDisp);
    const urlSalida = urlDeDocumento(ID_PROYECTO, "SALIDA", idDisp);
    const urlHistoria = urlDeColección(ID_PROYECTO, "HISTORIAL");
    this.daoEntrada = new DaoEntradaDispositivo(urlEntrada);
    this.daoSalida = new DaoSalidaDispositivo(urlSalida);
    this.daoHistorial = new DaoHistorialDispositivo(idDisp, urlHistoria);
    this.ctrlDispositivo = new CtrlDispositivo(idDisp, sondeaSalida,
      muestraSalida, recuperaEntrada, muestraError, this.daoHistorial,
      this.daoEntrada, this.daoSalida);
  }
}