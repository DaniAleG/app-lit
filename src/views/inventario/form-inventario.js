import { LitElement, html, css } from "lit";

class FormInventario extends LitElement {
  static get properties() {
    return {
      codigo: { type: String },
      nombre: { type: String },
      categoria: { type: String },
      cantidad: { type: String },
      precio: { type: String },
      error: { type: String },
    };
  }

  static get styles() {
    return css`
      fieldset {
        display: grid;
        gap: 8px;
        max-width: 360px;
      }
      label {
        display: block;
        font-weight: bold;
      }
      input {
        width: 100%;
        box-sizing: border-box;
      }
      .error {
        color: #b00020;
      }
    `;
  }

  constructor() {
    super();
    this.limpiar();
  }

  limpiar() {
    this.codigo = this.nombre = this.categoria = "";
    this.cantidad = this.precio = "";
    this.error = "";
  }

  // Devuelve una función que guarda lo escrito en la propiedad indicada
  handler(campo) {
    return (event) => {
      this[campo] = event.target.value;
    };
  }

  // Devuelve un mensaje de error o "" si todo está bien
  validar() {
    const campos = [this.codigo, this.nombre, this.categoria, this.cantidad, this.precio];
    if (campos.some((valor) => String(valor).trim() === "")) {
      return "Todos los campos son obligatorios.";
    }
    const cantidad = Number(this.cantidad);
    const precio = Number(this.precio);
    if (Number.isNaN(cantidad) || cantidad < 0) {
      return "La cantidad debe ser un número mayor o igual a 0.";
    }
    if (Number.isNaN(precio) || precio < 0) {
      return "El precio debe ser un número mayor o igual a 0.";
    }
    return "";
  }

  registrar(event) {
    event.preventDefault();

    this.error = this.validar();
    if (this.error) return;

    const producto = {
      codigo: this.codigo.trim(),
      nombre: this.nombre.trim(),
      categoria: this.categoria.trim(),
      cantidad: Number(this.cantidad),
      precio: Number(this.precio),
    };

    this.dispatchEvent(
      new CustomEvent("producto-registrado", {
        detail: producto,
        bubbles: true,
        composed: true,
      })
    );

    this.limpiar();
  }

  render() {
    return html`
      <form @submit=${this.registrar} novalidate>
        <fieldset>
          <legend>Registro de producto</legend>

          <div>
            <label for="codigo">Código:</label>
            <input id="codigo" type="text" .value=${this.codigo ?? ""} @input=${this.handler("codigo")} />
          </div>

          <div>
            <label for="nombre">Nombre:</label>
            <input id="nombre" type="text" .value=${this.nombre ?? ""} @input=${this.handler("nombre")} />
          </div>

          <div>
            <label for="categoria">Categoría:</label>
            <input id="categoria" type="text" .value=${this.categoria ?? ""} @input=${this.handler("categoria")} />
          </div>

          <div>
            <label for="cantidad">Cantidad:</label>
            <input id="cantidad" type="number" min="0" .value=${this.cantidad ?? ""} @input=${this.handler("cantidad")} />
          </div>

          <div>
            <label for="precio">Precio:</label>
            <input id="precio" type="number" min="0" step="0.01" .value=${this.precio ?? ""} @input=${this.handler("precio")} />
          </div>

          ${this.error ? html`<p class="error">${this.error}</p>` : ""}

          <button type="submit">Registrar</button>
        </fieldset>
      </form>
    `;
  }
}

window.customElements.define("wc-form-inventario", FormInventario);