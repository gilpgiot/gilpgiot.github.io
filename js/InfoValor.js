import { valida } from "../lib/util.js";

export class InfoValor {
  /** @param {{id: string,valor: number}} param0 */
  constructor({ id, valor }) {
    this.id = id;
    this.valor = valor;
  }
  valida() {
    valida(this.id, "Falta el id");
    valida(this.valor !== null && this.valor !== undefined, "Falta el valor");
  }
}