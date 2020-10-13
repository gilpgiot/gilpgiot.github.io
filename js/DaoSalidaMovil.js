import { valida } from "../lib/util.js";
import { leeValor } from "./utilBD.js";

export class DaoSalidaMóvil {
  /**
   * @param {{collection: (col: string) => any;}} firestore
   * @param {string} idDisp
   */
  constructor(firestore, idDisp) {
    this._colección = firestore.collection("SALIDA");
    this._idDisp = idDisp;
  }
  /** @param {number} valor
   * @returns {Promise<void>} */
  async modifica(valor) {
    valida(valor !== null && valor !== undefined && !isNaN(valor),
      "Falta el valor de la salida.");
    await this._colección.doc(this._idDisp).set({ VALOR: valor });
  }

  /** @returns {Promise<number>} */
  async busca() {
    let doc = await this._colección.doc(this._idDisp).get();
    return leeValor(doc);
  }
}