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
   * Desplaza el cursor activo hacia el siguiente nodo. Complejidad: O(1)
   * @returns {Object|null} El dato del nuevo nodo activo o null si alcanza el final.
   */
  avanzar() {
    if (this.actual && this.actual.siguiente) {
      this.actual = this.actual.siguiente;
      return this.actual.dato;
    }
    return null;
  }

  /**
   * Desplaza el cursor activo hacia el nodo anterior. Complejidad: O(1)
   * @returns {Object|null} El dato del nuevo nodo activo o null si alcanza el inicio.
   */
  retroceder() {
    if (this.actual && this.actual.anterior) {
      this.actual = this.actual.anterior;
      return this.actual.dato;
    }
    return null;
  }

  /**
   * Retorna el elemento actualmente seleccionado por el cursor.
   * @returns {Object|null}
   */
  obtenerActual() {
    return this.actual ? this.actual.dato : null;
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
