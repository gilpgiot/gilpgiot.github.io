import { leeValor } from "./utilBD.js";

export class DaoEntradaMóvil {
  /**
   * @param {{collection: (col: string) => any;}} firestore
   * @param {string} idDisp
   */
  constructor(firestore, idDisp) {
    this._colección = firestore.collection("ENTRADA");
    this._idDisp = idDisp;
  }
  /** @param {(error: Error) => void} callbackError
   * @param {(valor: number) => void} callback */
  lee(callbackError, callback) {
    /* Pide el documento correspondiente de "ENTRADA". */
    this._colección.doc(this._idDisp).onSnapshot(
      docSnapshot => callback(leeValor(docSnapshot)),
      /** @param {Error} error */
      error => {
        callbackError(error);
        this.lee(callbackError, callback);
      }
    );
  }
}