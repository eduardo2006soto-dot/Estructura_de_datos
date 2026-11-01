//Batería de Pruebas Unitarias Automatizadas

const { test, describe, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const ListaDobleNavegacion = require('../src/models/ListaDobleNavegacion');

describe('Pruebas Unitarias - Navegación Bidireccional (Avance 4 ABP)', () => {
  let lista;

  beforeEach(() => {
    lista = new ListaDobleNavegacion();
    lista.insertar({ id: 101, accion: 'Cargar Vista A' });
    lista.insertar({ id: 102, accion: 'Filtrar Datos B' });
    lista.insertar({ id: 103, accion: 'Exportar Reporte C' });
  });

  test('1. Inicialización: El cursor debe situarse en el primer nodo insertado', () => {
    assert.equal(lista.obtenerActual().id, 101);
    assert.equal(lista.longitud, 3);
  });

  test('2. Avance Secuencial: Debe desplazarse hacia adelante correctamente', () => {
    assert.equal(lista.avanzar().id, 102);
    assert.equal(lista.avanzar().id, 103);
    assert.equal(lista.avanzar(), null);
  });

  test('3. Retroceso Secuencial: Debe navegar hacia atrás y mantener la consistencia', () => {
    lista.avanzar();
    lista.avanzar();
    assert.equal(lista.retroceder().id, 102);
    assert.equal(lista.retroceder().id, 101);
    assert.equal(lista.retroceder(), null);
  });

  test('4. Eliminación de Nodo Intermedio: Reconexión correcta de punteros', () => {
    lista.avanzar(); // Cursor en 102
    const exito = lista.eliminarActual();
    assert.equal(exito, true);
    assert.equal(lista.longitud, 2);
    assert.equal(lista.obtenerActual().id, 103);
    assert.equal(lista.retroceder().id, 101);
  });

  test('5. Casos Límite: Manejo seguro sobre estructuras vacías', () => {
    const listaVacia = new ListaDobleNavegacion();
    assert.equal(listaVacia.obtenerActual(), null);
    assert.equal(listaVacia.avanzar(), null);
    assert.equal(listaVacia.retroceder(), null);
    assert.equal(listaVacia.eliminarActual(), false);
  });

  test('6. Caso Límite Adicional: Eliminación del único nodo en lista unitaria', () => {
    const listaUnitaria = new ListaDobleNavegacion();
    listaUnitaria.insertar({ id: 999, accion: 'Unico' });
    assert.equal(listaUnitaria.eliminarActual(), true);
    assert.equal(listaUnitaria.longitud, 0);
    assert.equal(listaUnitaria.obtenerActual(), null);
    assert.equal(listaUnitaria.cabeza, null);
    assert.equal(listaUnitaria.cola, null);
  });
});
