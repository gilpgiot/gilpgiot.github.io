class MiFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `Copyright &copy; 2020 Gilberto Pacheco Gallegos.`;
  }
}
customElements.define("mi-footer", MiFooter);