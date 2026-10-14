const { getMemoryUsage } = require('./Profiler');

const N = 1000000; // 1 millón de registros
const memoriaInicial = getMemoryUsage();

// TDA: Coordenada basada en Objetos
class CoordenadaObj {
  constructor(lat, lng) {
    this.lat = lat; // Número de punto flotante de 64 bits
    this.lng = lng;
  }
}

// Almacenamos en memoria
let coordenadas = [];
for (let i = 0; i < N; i++) {
  coordenadas.push(new CoordenadaObj(i * 0.1, i * -0.1));
}

const memoriaFinal = getMemoryUsage();

console.log(`[Enfoque Objetos] Memoria inicial: ${memoriaInicial} MB`);
console.log(`[Enfoque Objetos] Memoria final: ${memoriaFinal} MB`);
console.log(`[Enfoque Objetos] Consumo Neto: ${memoriaFinal - memoriaInicial} MB`);