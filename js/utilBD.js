import { InfoValor } from "./InfoValor.js";

/** @param {{ exists: boolean; data: () => any; id: any; }} doc */
export function leeInfoValor(doc) {
  if (doc.exists) {
    const data = doc.data();
    return new InfoValor({ id: doc.id, valor: data.VALOR || 0 });
  } else {
    return null;
  }
}
