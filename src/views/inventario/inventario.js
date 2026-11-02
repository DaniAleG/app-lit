import { LitElement, html, css } from "lit-element";
import "./form-inventario.js"; // <wc-form-inventario>  · Rol 2
import "./tabla-inventario.js"; // <wc-tabla-inventario> · Rol 3

/**
 * <wc-inventario> · Componente padre del módulo de Inventario (Grupo 2).
 *
 * Conecta el formulario con la tabla:
 *  - Escucha el evento `producto-registrado` del formulario (sube con event.detail).
 *  - Guarda los productos en `lista` y se la pasa a la tabla con `.list` (baja por propiedad).
 *  - Escucha `producto-eliminado` de la tabla (opcional) para quitar un producto.
 *
 * Formato de cada producto:
 *  { codigo: string, nombre: string, categoria: string, cantidad: number, precio: number }
 */
class Inventario extends LitElement {
  static get properties() {
    return {
      lista: { type: Array },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 960px;
        margin: 0 auto;
        padding: 24px 16px;
        color: #1f2933;
      }
      h1 {
        margin: 0 0 4px;
        font-size: 1.6rem;
      }
      .subtitulo {
        margin: 0 0 20px;
        color: #52606d;
      }
      .resumen {
        display: flex;
        gap: 12px;
        margin: 20px 0;
        flex-wrap: wrap;
      }
      .dato {
        background: #fff;
        border: 1px solid #d9e2ec;
        border-radius: 8px;
        padding: 10px 16px;
        min-width: 140px;
      }
      .dato span {
        display: block;
        font-size: 0.8rem;
        color: #52606d;
      }
      .dato strong {
        font-size: 1.3rem;
      }
    `;
  }

  constructor() {
    super();
    // Se inicializa vacía: la tabla hace list.map y fallaría con undefined.
    this.lista = [];
  }

  /**
   * Recibe el producto del formulario.
   * Si el código ya existe, suma la cantidad (entrada de stock);
   * si no, lo agrega. Siempre se asigna un arreglo NUEVO para que Lit re-renderice.
   */
  agregar(event) {
    const producto = {
      codigo: String(event.detail.codigo).trim(),
      nombre: event.detail.nombre,
      categoria: event.detail.categoria,
      cantidad: Number(event.detail.cantidad),
      precio: Number(event.detail.precio),
    };

    const existe = this.lista.some((p) => p.codigo === producto.codigo);

    if (existe) {
      this.lista = this.lista.map((p) =>
        p.codigo === producto.codigo
          ? { ...p, cantidad: p.cantidad + producto.cantidad, precio: producto.precio }
          : p
      );
    } else {
      this.lista = [...this.lista, producto];
    }
  }

  /** Quita un producto cuando la tabla emite `producto-eliminado`. */
  eliminar(event) {
    this.lista = this.lista.filter((p) => p.codigo !== event.detail.codigo);
  }

  get totalUnidades() {
    return this.lista.reduce((suma, p) => suma + p.cantidad, 0);
  }

  get valorTotal() {
    return this.lista.reduce((suma, p) => suma + p.cantidad * p.precio, 0);
  }

  render() {
    return html`
      <h1>Gestión de inventario</h1>
      <p class="subtitulo">Registra productos y controla su stock.</p>

      <wc-form-inventario
        @producto-registrado=${this.agregar}
      ></wc-form-inventario>

      <div class="resumen">
        <div class="dato"><span>Productos</span><strong>${this.lista.length}</strong></div>
        <div class="dato"><span>Unidades</span><strong>${this.totalUnidades}</strong></div>
        <div class="dato">
          <span>Valor total</span><strong>$${this.valorTotal.toFixed(2)}</strong>
        </div>
      </div>

      <wc-tabla-inventario
        .list=${this.lista}
        @producto-eliminado=${this.eliminar}
      ></wc-tabla-inventario>
    `;
  }
}

window.customElements.define("wc-inventario", Inventario);
