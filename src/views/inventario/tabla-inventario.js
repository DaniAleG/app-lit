import { LitElement, html, css } from "lit";

class TablaInventario extends LitElement {
  static get properties() {
    return {
      list: { type: Array },
    };
  }

  constructor() {
    super();
    this.list = [];
  }

  render() {
    return html`<h2>Listado de productos</h2>`;
  }
}

window.customElements.define("wc-tabla-inventario", TablaInventario);