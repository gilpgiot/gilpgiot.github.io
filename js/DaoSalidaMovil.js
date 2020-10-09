import { InfoValor } from "./InfoValor.js";
import { leeInfoValor } from "./utilBD.js";

export class DaoSalidaMóvil {
  /** @param {{collection: (col: string) => any; }} firestore */
  constructor(firestore) {
    this._colección = firestore.collection("SALIDA");
  }
  /** @param {InfoValor} modelo
   * @returns {Promise<void>} */
  async modifica(modelo) {
    modelo.valida();
    await this._colección.doc(modelo.id).set({ VALOR: modelo.valor });
  }

  /** @param {string} id
   * @returns {Promise<InfoValor>} */
  async busca(id) {
    let doc = id ? await this._colección.doc(id).get() : { exists: false };
    return leeInfoValor(doc);
  }
}
