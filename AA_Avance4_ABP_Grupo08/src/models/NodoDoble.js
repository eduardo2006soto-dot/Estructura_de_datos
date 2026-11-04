/**
 * Clase que representa un Nodo con referencia bidireccional.
 */
class NodoDoble {
  /**
   * @param {Object} dato - Objeto de dominio del proyecto ABP.
   */
  constructor(dato) {
    this.dato = dato;
    this.siguiente = null;
    this.anterior = null;
  }
}

module.exports = NodoDoble;