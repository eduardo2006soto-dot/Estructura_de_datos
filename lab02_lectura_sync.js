const fs = require('fs');
const { performance } = require('perf_hooks');

const FILE_NAME = 'coordenadas_masivas.csv';

console.log('[Lectura Síncrona] Iniciando carga en memoria...');

const memoryBefore = process.memoryUsage().heapUsed;
const start = performance.now();

// I/O Bloqueante: Carga absolutamente TODO el archivo en memoria RAM S(n) = O(n)
const data = fs.readFileSync(FILE_NAME, 'utf-8');

// ZONA DE ALTO CONSUMO: Se crean millones de strings en el Heap de V8,
// obligando al Garbage Collector (GC) a trabajar masivamente para limpiar memoria después.
const lineas = data.split('\n');

const end = performance.now();
const memoryAfter = process.memoryUsage().heapUsed;

console.log(`[Lectura Síncrona] Total registros leídos: ${lineas.length - 1}`);
console.log(`[Lectura Síncrona] Tiempo de I/O + Parsing: ${((end - start) / 1000).toFixed(2)} segundos.`);
console.log(`[Lectura Síncrona] Consumo Neto de RAM: ${((memoryAfter - memoryBefore) / 1024 / 1024).toFixed(2)} MB`);