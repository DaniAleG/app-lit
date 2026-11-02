import { LitElement, html, css } from "lit-element";
import "../../externos/equipo-3/register.js"; // <wc-form-register> · formulario de pedidos del Equipo 3 (sin cambios)
import "../inventario/tabla-inventario.js"; // <wc-tabla-inventario> · tabla de inventario de nuestro equipo

/**
 * <wc-integracion> · Padre del taller de integración (Grupo 2 · Inventario).
 *
 * Conecta un componente de otro equipo con uno nuestro:
 *  - Hijo que emite:  <wc-form-register> del Equipo 3 → evento `pedidoRegister`
 *                     detail = { cliente, producto, cantidad, precio, fecha, estado }
 *  - Hijo que recibe: <wc-tabla-inventario> nuestro → propiedad `.list`
 *                     [{ codigo, nombre, categoria, cantidad, precio }]
 *
 * El evento SUBE del formulario al padre; la lista BAJA del padre a la tabla.
 */
class Integracion extends LitElement {
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
        font-family: system-ui, sans-serif;
        color: #1f2933;
      }
      h1 {
        margin: 0 0 4px;
        font-size: 1.6rem;
      }
      p {
        margin: 0;
        color: #52606d;
      }
    `;
  }

  constructor() {
    super();
    // Se inicializa vacía: la tabla recorre la lista y fallaría con undefined.
    this.lista = [];
  }

  /**
   * Recibe el pedido del formulario del Equipo 3 y lo agrega a la lista.
   * Siempre se asigna un arreglo NUEVO para que Lit vuelva a renderizar la tabla.
   * Rol 2: aquí va el adaptador que convierte el detail al formato de nuestra tabla.
   */
  agregar(event) {
    this.lista = [...this.lista, event.detail];
  }

  render() {
    return html`
      <h1>Integración · Pedidos (Equipo 3) → Inventario (Grupo 2)</h1>
      <p>Cada pedido registrado en el formulario del Equipo 3 aparece en nuestra tabla de inventario.</p>

      <wc-form-register @pedidoRegister=${this.agregar}></wc-form-register>

      <wc-tabla-inventario .list=${this.lista}></wc-tabla-inventario>
    `;
  }
}

window.customElements.define("wc-integracion", Integracion);
