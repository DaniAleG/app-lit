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

  /** Convierte a número; si llega texto o vacío, usa 0 para no romper la tabla. */
  aNumero(valor) {
    const numero = Number(valor);
    return Number.isNaN(numero) ? 0 : numero;
  }

  /**
   * Adaptador (Rol 2): convierte el pedido del Equipo 3 al formato de nuestra tabla.
   * { cliente, producto, cantidad, precio, fecha, estado }
   *   → { codigo, nombre, categoria, cantidad, precio }
   * Se hace aquí en el padre, nunca dentro del componente externo.
   */
  agregar(event) {
    const pedido = event.detail ?? {};
    const fila = {
      codigo: `PED-${String(this.lista.length + 1).padStart(3, "0")}`,
      nombre: pedido.producto || "Sin producto",
      categoria: `Pedido de ${pedido.cliente || "cliente sin nombre"}`,
      cantidad: this.aNumero(pedido.cantidad),
      precio: this.aNumero(pedido.precio),
    };
    this.lista = [...this.lista, fila];
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