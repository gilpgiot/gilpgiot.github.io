class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `&copy; 2021
      Gilberto Pacheco Gallegos.`;
  }
}
customElements.define(
  "mi-footer", MiFooter);