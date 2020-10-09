import { CtrlDispositivo } from "./CtrlDispositivo.js";
import { DaoEntradaDispositivo } from "./DaoEntradaDispositivo.js";
import { DaoHistorialDispositivo } from "./DaoHistorialDispositivo.js";
import { DaoSalidaDispositivo } from "./DaoSalidaDispositivo.js";
import { urlDeColección, urlDeDocumento } from "./utilIoT.js";

const ID_PROYECTO = "gilpgiotx";
const ID_DISP = "iot1";
const URL_ENTRADA = urlDeDocumento(ID_PROYECTO, "ENTRADA", ID_DISP);
const URL_SALIDA = urlDeDocumento(ID_PROYECTO, "SALIDA", ID_DISP);
const URL_HISTORIAL = urlDeColección(ID_PROYECTO, "HISTORIAL");

export class FábricaDispositivo {
  /**
   * @param {() => boolean} sondeaSalida
   * @param {(valor: number) => void} muestraSalida
   * @param {() => number} recuperaEntrada
   * @param {(valor: Error) => void} muestraError
   */
  constructor(sondeaSalida, muestraSalida, recuperaEntrada, muestraError) {
    this.daoEntrada = new DaoEntradaDispositivo(URL_ENTRADA);
    this.daoSalida = new DaoSalidaDispositivo(URL_SALIDA);
    this.daoHistorial = new DaoHistorialDispositivo(URL_HISTORIAL);
    this.ctrlDispositivo = new CtrlDispositivo(ID_DISP, sondeaSalida,
      muestraSalida, recuperaEntrada, muestraError, this.daoHistorial,
      this.daoEntrada, this.daoSalida);
  }
  /**
   * @param {() => boolean} sondeaSalida
   * @param {(valor: number) => void} muestraSalida
   * @param {() => number} recuperaEntrada
   * @param {(valor: Error) => void} muestraError
   */
  static instancia(sondeaSalida, muestraSalida, recuperaEntrada, muestraError) {
    return new FábricaDispositivo(sondeaSalida, muestraSalida, recuperaEntrada,
      muestraError)
  }
}