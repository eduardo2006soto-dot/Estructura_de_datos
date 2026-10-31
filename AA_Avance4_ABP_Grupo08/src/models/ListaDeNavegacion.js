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
