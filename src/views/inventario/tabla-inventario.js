import { LitElement, html, css } from "lit";

class TablaInventario extends LitElement {
  static get properties() {
    return {
      list: { type: Array },
    };
  }

  static get styles() {
    return css`
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 16px;
      }
      th,
      td {
        border: 1px solid #ccc;
        padding: 8px;
        text-align: left;
      }
      th {
        background: #f0f0f0;
      }
      .vacio {
        color: #666;
        font-style: italic;
      }
      .stock-bajo {
        color: #b00020;
        font-weight: bold;
      }
    `;
  }

  constructor() {
    super();
    this.list = [];
  }

  eliminar(codigo) {
    this.dispatchEvent(
      new CustomEvent("producto-eliminado", {
        detail: { codigo },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const productos = this.list ?? [];

    if (productos.length === 0) {
      return html`
        <h2>Listado de productos</h2>
        <p class="vacio">No hay productos registrados</p>
      `;
    }

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
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          ${productos.map(
            (producto) => html`
              <tr>
                <td>${producto.codigo}</td>
                <td>${producto.nombre}</td>
                <td>${producto.categoria}</td>
                <td>${producto.cantidad}</td>
                <td>$${Number(producto.precio).toFixed(2)}</td>
                <td>
                  ${producto.cantidad < 5
                    ? html`<span class="stock-bajo">Stock bajo</span>`
                    : "Disponible"}
                </td>
                <td>
                  <button type="button" @click=${() => this.eliminar(producto.codigo)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }
}

window.customElements.define("wc-tabla-inventario", TablaInventario);