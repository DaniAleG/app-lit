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
    return html`
      <h2>Listado de productos</h2>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          ${(this.list ?? []).map(
            (producto) => html`
              <tr>
                <td>${producto.codigo}</td>
                <td>${producto.nombre}</td>
                <td>${producto.categoria}</td>
                <td>${producto.cantidad}</td>
                <td>$${Number(producto.precio).toFixed(2)}</td>
              </tr>
            `
          )}
        </tbody>
      </table>
      `;
  }
}

window.customElements.define("wc-tabla-inventario", TablaInventario);