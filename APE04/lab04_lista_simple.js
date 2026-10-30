// Tarea 1 y Tarea 3: Implementación del TDA Lista Enlazada Simple
class Nodo {
  constructor(dato) {
    this.dato = dato; // Carga útil (ej. objeto con coordenadas/id)
    this.siguiente = null; // Puntero/referencia al siguiente nodo
  }
}

class ListaSatelital {
  constructor() {
    this.cabeza = null; // Primer elemento de la lista
    this.tamaño = 0; // Contador de elementos
  }

  // Método para insertar al inicio: Complejidad O(1)
  prepend(dato) {
    const nuevoNodo = new Nodo(dato);
    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
    } else {
      nuevoNodo.siguiente = this.cabeza;
      this.cabeza = nuevoNodo;
    }
    this.tamaño++; // Se incrementa siempre al insertar un nodo
  }

  // Tarea 3: Método para imprimir los primeros N elementos (Recorrido O(n))
  imprimirPrimeros(limite) {
    let actual = this.cabeza;
    let contador = 0;
    let salida = "";

    while (actual && contador < limite) {
      salida += `[ID: ${actual.dato.id}] -> `;
      actual = actual.siguiente;
      contador++;
    }
    console.log(salida + "NULL");
  }
}

module.exports = { ListaSatelital }; 