# app-lit · Grupo 2 · Inventario

Aplicación en **Lit + Vite** para registrar productos de inventario. Los componentes se comunican así: los datos **bajan** por propiedades y los avisos **suben** por eventos.

## Cómo ejecutar

```bash
npm install
npm run dev
```

- App de inventario: http://localhost:5173/
- Taller de integración: http://localhost:5173/integracion.html

## Componentes

### `<wc-form-inventario>` · formulario
**Archivo:** `src/views/inventario/form-inventario.js`

| Recibe (propiedad) | Emite (evento) |
|---|---|
| nada | `producto-registrado` |

**Formato del `detail`:**
```js
{ codigo: String, nombre: String, categoria: String, cantidad: Number, precio: Number }
```
- Valida que no haya campos vacíos y que `cantidad` y `precio` sean números ≥ 0.
- El evento usa `bubbles: true, composed: true`, así que sale del Shadow DOM.
- Después de emitir, limpia el formulario.

### `<wc-tabla-inventario>` · tabla
**Archivo:** `src/views/inventario/tabla-inventario.js`

| Recibe (propiedad) | Emite (evento) |
|---|---|
| `.list`: arreglo de productos | `producto-eliminado` con `detail: { codigo }` |

- Si `list` llega vacía o `undefined`, muestra "No hay productos registrados".
- Marca **Stock bajo** cuando la cantidad es menor que 5.
- Los estilos están en `static styles` (encapsulados).

### `<wc-inventario>` · padre
**Archivo:** `src/views/inventario/inventario.js`

Escucha `producto-registrado`, guarda la lista con `this.lista = [...this.lista, producto]` y se la pasa a la tabla con `.list`. Si el código ya existe, suma la cantidad. También escucha `producto-eliminado`.

### `<wc-integracion>` · padre del taller
**Archivo:** `src/views/integracion/integracion.js`

Conecta el formulario del **Equipo 3** (`<wc-form-register>`, evento `pedidoRegister`) con nuestra `<wc-tabla-inventario>`, y adapta los datos en el método `agregar(event)`. Documentación completa en [`src/views/integracion/integracion.md`](src/views/integracion/integracion.md).

## Ejemplo de uso

```js
import "./src/views/inventario/form-inventario.js";
import "./src/views/inventario/tabla-inventario.js";

// En el render() de un componente padre:
html`
  <wc-form-inventario @producto-registrado=${this.agregar}></wc-form-inventario>
  <wc-tabla-inventario .list=${this.lista}></wc-tabla-inventario>
`;
```

## Reglas del equipo

- Nombres propios para las etiquetas (`wc-form-inventario`, no `wc-form-register`), para que no choquen con otros equipos.
- Ningún componente importa archivos del resto del proyecto, así se pueden copiar solos.
- No se usa `<wc-navbar>`, `<wc-viewport>` ni `<wc-route>`.

## Equipo

| Rol | Integrante |
|---|---|
| Rol 1 · Integración | [@DaniAleG](https://github.com/DaniAleG) |
| Rol 2 · Adaptador y pruebas | [@AnahiMirley](https://github.com/AnahiMirley) |
| Rol 3 · Revisión externa | [@MelanieBarrionuevo](https://github.com/MelanieBarrionuevo) |
| Rol 4 · Documentación | [@leoncitogrrr](https://github.com/leoncitogrrr) |
