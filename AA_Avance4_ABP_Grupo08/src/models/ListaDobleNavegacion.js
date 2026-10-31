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

