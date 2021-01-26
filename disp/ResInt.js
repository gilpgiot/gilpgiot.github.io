/** Se utiliza para devolver un
 * valor o un error, pues no
 * usaremos excepciones. */
export class ResInt {
  /**
   * @param {number} valor 
   * @param {string} error  */
  constructor(valor, error) {
    this.valor = valor;
    this.error = error;
  }
}