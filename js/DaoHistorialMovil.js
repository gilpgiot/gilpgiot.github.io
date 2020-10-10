import { paraTodos } from "../lib/util.js";
import { InfoHistorial } from "./InfoHistorial.js";

export class DaoHistorialMóvil {
  /** @param {{collection: (col: string) => any; }} firestore */
  constructor(firestore) {
    this._colección = firestore.collection("HISTORIAL");
  }
  /** @returns {Promise<InfoHistorial[]>} */
  async consulta() {
    const querySnapshot = await this._colección.orderBy("HIST_TS").get();
    return paraTodos(querySnapshot, doc => this._cargaHistorial(doc));
  }
  _cargaHistorial(doc) {
    if (doc.exists) {
      const data = doc.data();
      return new InfoHistorial({
        id: doc.id,
        dispositivo: data.DISP_ID,
        timestamp: data.HIST_TS,
        valor: data.VALOR
      });
    } else {
      return null;
    }
  }
}