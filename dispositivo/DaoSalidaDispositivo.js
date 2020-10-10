export class DaoSalidaDispositivo {
  /** @param {string} url */
  constructor(url) {
    this._url = url;
  }
  /**
   * @returns {Promise<number>}
   */
  async busca() {
    const resp = await fetch(this._url);
    if (resp.ok) {
      const json = await resp.json();
      const valor = json.fields.VALOR && json.fields.VALOR.integerValue;
      return valor;
    } else if (resp.status === 404) {
      return null;
    } else {
      throw new Error(resp.statusText);
    }
  }
}