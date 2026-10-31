const NodoDoble = require('./NodoDoble');

/**
 * Estructura de datos dinámica para la gestión de navegación bidireccional.
 */
class ListaDobleNavegacion {
  constructor () {
    this.cabeza = null;
    this.cola = null;
    this.actual = null; // Cursor de navegación activa
    this.longitud = 0;
  }
  /**
   * Inserta un nuevo registro al final de la lista. Complejidad: O(1)
   * @param {Object} dato - Registro a almacenar.
   * @returns {NodoDoble} El nodo creado.
   */
  insertar(dato) {
    const nuevoNodo = new NodoDoble(dato);
    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
      this.actual = nuevoNodo;
    } else {
      this.cola.siguiente = nuevoNodo;
      nuevoNodo.anterior = this.cola;
      this.cola = nuevoNodo;
    }
    this.longitud++;
    return nuevoNodo;
  }

 /**
   * Elimina el elemento en la posición actual y reconecta los enlaces.
   * Libera las referencias internas para apoyar la gestión de memoria. Complejidad: O(1)
   * @returns {boolean} Confirmación de eliminación.
   */
  eliminarActual() {
    if (!this.actual) return false;
    const nodoAEliminar = this.actual;

    // Caso cuando solo existe un nodo en la lista
    if (this.longitud === 1) {
      this.cabeza = null;
      this.cola = null;
      this.actual = null;
    } else {
      // Reconexión del enlace anterior
      if (nodoAEliminar.anterior) {
        nodoAEliminar.anterior.siguiente = nodoAEliminar.siguiente;
      } else {
        this.cabeza = nodoAEliminar.siguiente;
      }

      // Reconexión del enlace siguiente
      if (nodoAEliminar.siguiente) {
        nodoAEliminar.siguiente.anterior = nodoAEliminar.anterior;
        this.actual = nodoAEliminar.siguiente;
      } else {
        this.cola = nodoAEliminar.anterior;
        this.actual = nodoAEliminar.anterior;
      }
    }

    // Limpieza explícita de referencias (Garbage Collection Helper)
    nodoAEliminar.siguiente = null;
    nodoAEliminar.anterior = null;
    this.longitud--;
    return true;
  }
}

module.exports = ListaDobleNavegacion