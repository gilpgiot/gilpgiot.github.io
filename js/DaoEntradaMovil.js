import { InfoValor } from "./InfoValor.js";
import { leeInfoValor } from "./utilBD.js";

export class DaoEntradaMóvil {
  /** @param {{collection: (col: string) => any; }} firestore */
  constructor(firestore) {
    this._colección = firestore.collection("ENTRADA");
  }
  /** @param {string} idDisp
   * @param {(error: Error) => void} callbackError
   * @param {(modelo: InfoValor) => void} callback */
  lee(idDisp, callbackError, callback) {
    /* Pide todos los documentos de la colección "PRIVILEGIO". */
    this._colección.doc(idDisp).onSnapshot(
      docSnapshot => callback(leeInfoValor(docSnapshot)),
      /** @param {Error} error */
      error => {
        callbackError(error);
        this.lee(idDisp, callbackError, callback);
      }
    );
  }
}