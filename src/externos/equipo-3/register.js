import { LitElement, html, css } from 'lit';

/**
 * <wc-form-register> · Formulario de Gestión de pedidos
 *
 * Emite:  pedidoRegister  (bubbles: true, composed: true)
 *         event.detail = {
 *           cliente: String,
 *           producto: String,
 *           cantidad: Number,
 *           precio: Number,      // precio unitario
 *           fecha: String,       // "YYYY-MM-DD"
 *           estado: String       // "Pendiente" | "En preparación" | "Entregado"
 *         }
 */
class Register extends LitElement {

  static styles = css`
    :host {
      display: block;
      max-width: 32rem;
      margin: 2rem auto;
      font-family: Arial, sans-serif;
    }

    fieldset {
      display: grid;
      gap: 1rem;
      padding: 1.5rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.75rem;
      background: #fff;
      box-shadow: 0 4px 14px rgb(15 23 42 / 8%);
    }

    legend {
      padding: 0 0.5rem;
      color: #1e293b;
      font-size: 1.25rem;
      font-weight: 700;
    }

    .field {
      display: grid;
      gap: 0.4rem;
    }

    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    label {
      color: #334155;
      font-weight: 600;
    }

    input,
    select {
      box-sizing: border-box;
      width: 100%;
      padding: 0.7rem 0.8rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.4rem;
      font: inherit;
      background: #fff;
    }

    input:focus,
    select:focus {
      border-color: #2563eb;
      outline: 3px solid rgb(37 99 235 / 18%);
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    button {
      padding: 0.7rem 1rem;
      border: 0;
      border-radius: 0.4rem;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
    }

    .submit {
      color: #fff;
      background: #2563eb;
    }

    .submit:hover {
      background: #1d4ed8;
    }

    .clear {
      color: #334155;
      background: #e2e8f0;
    }

    .clear:hover {
      background: #cbd5e1;
    }
  `;

  static get properties() {
    return {
      cliente: { type: String },
      producto: { type: String },
      cantidad: { type: String },
      precio: { type: String },
      fecha: { type: String },
      estado: { type: String },
    };
  }

  constructor() {
    super();
    this.clearFields();
  }

  // Guarda en this[name] lo que el usuario escribe en el input
  handler(name) {
    return (event) => {
      this[name] = event.target.value;
    };
  }

  // Fecha de hoy (hora local) en formato YYYY-MM-DD, lo que usa <input type="date">
  today() {
    let hoy = new Date();
    let mes = String(hoy.getMonth() + 1).padStart(2, '0');
    let dia = String(hoy.getDate()).padStart(2, '0');
    return `${hoy.getFullYear()}-${mes}-${dia}`;
  }

  register(event) {
    event.preventDefault();
    let data = {
      cliente: this.cliente.trim(),
      producto: this.producto.trim(),
      cantidad: Number(this.cantidad),
      precio: Number(this.precio),
      fecha: this.fecha,
      estado: this.estado,
    };
    let options = {
      detail: data,
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('pedidoRegister', options));
    this.clearFields();
  }

  clearFields() {
    this.cliente = '';
    this.producto = '';
    this.cantidad = '1';
    this.precio = '';
    this.fecha = this.today();
    this.estado = 'Pendiente';
  }

  render() {
    return html`
      <form @submit="${this.register}">
        <fieldset>
          <legend>Registro de pedido</legend>

          <div class="field">
            <label for="cliente">Cliente:</label>
            <input @input="${this.handler('cliente')}"
              .value="${this.cliente}"
              type="text" id="cliente" name="cliente" autocomplete="name" required />
          </div>

          <div class="field">
            <label for="producto">Producto:</label>
            <input @input="${this.handler('producto')}"
              .value="${this.producto}"
              type="text" id="producto" name="producto" required />
          </div>

          <div class="row">
            <div class="field">
              <label for="cantidad">Cantidad:</label>
              <input @input="${this.handler('cantidad')}"
                .value="${this.cantidad}"
                type="number" id="cantidad" name="cantidad" min="1" step="1" required />
            </div>

            <div class="field">
              <label for="precio">Precio unitario ($):</label>
              <input @input="${this.handler('precio')}"
                .value="${this.precio}"
                type="number" id="precio" name="precio" min="0" step="0.01" required />
            </div>
          </div>

          <div class="row">
            <div class="field">
              <label for="fecha">Fecha:</label>
              <input @input="${this.handler('fecha')}"
                .value="${this.fecha}"
                type="date" id="fecha" name="fecha" required />
            </div>

            <div class="field">
              <label for="estado">Estado:</label>
              <select @change="${this.handler('estado')}" .value="${this.estado}" id="estado" name="estado">
                <option value="Pendiente">Pendiente</option>
                <option value="En preparación">En preparación</option>
                <option value="Entregado">Entregado</option>
              </select>
            </div>
          </div>

          <div class="actions">
            <button class="submit" type="submit">Registrar pedido</button>
            <button class="clear" type="button" @click="${this.clearFields}">Limpiar campos</button>
          </div>
        </fieldset>
      </form>
    `;
  }
}

window.customElements.define('wc-form-register', Register);
