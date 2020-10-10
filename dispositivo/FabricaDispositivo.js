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
      const URL_ENTRADA = urlDeDocumento(ID_PROYECTO, "ENTRADA", idDisp);
      const URL_SALIDA = urlDeDocumento(ID_PROYECTO, "SALIDA", idDisp);
      const URL_HISTORIAL = urlDeColección(ID_PROYECTO, "HISTORIAL");
          this.daoEntrada = new DaoEntradaDispositivo(URL_ENTRADA);
    this.daoSalida = new DaoSalidaDispositivo(URL_SALIDA);
    this.daoHistorial = new DaoHistorialDispositivo(URL_HISTORIAL);
    this.ctrlDispositivo = new CtrlDispositivo(idDisp, sondeaSalida,
      muestraSalida, recuperaEntrada, muestraError, this.daoHistorial,
      this.daoEntrada, this.daoSalida);
  }
  /** @param {string} idDisp
   * @param {() => boolean} sondeaSalida
   * @param {(valor: number) => void} muestraSalida
   * @param {() => number} recuperaEntrada
   * @param {(valor: Error) => void} muestraError
   */
  static instancia(idDisp, sondeaSalida, muestraSalida, recuperaEntrada,
    muestraError) {
    return new FábricaDispositivo(idDisp, sondeaSalida, muestraSalida,
      recuperaEntrada, muestraError)
  }
}