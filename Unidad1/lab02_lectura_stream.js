const fs = require('fs');
const { performance } = require('perf_hooks');

const FILE_NAME = 'coordenadas_masivas.csv';

console.log('[Lectura por Stream] Iniciando procesamiento...');

const memoryBefore = process.memoryUsage().heapUsed;
const start = performance.now();
let totalRegistros = 0;

// Flujo de lectura no bloqueante en fragmentos (chunks)
const readableStream = fs.createReadStream(FILE_NAME, { encoding: 'utf-8' });

readableStream.on('data', (chunk) => {
  // ZONA DE AHOPRO DE ENERGÍA Y MEMORIA (Green Computing):
  // Solo se procesa el 'chunk' actual en un buffer pequeño (ej. 64KB).
  // S(n) = O(1) relativo al tamaño del buffer.
  // Al no acumular datos en memoria, se AHORRAN ciclos del Garbage Collector (GC),
  // reduciendo el consumo de CPU y la huella térmica del servidor.
  let lineBreakCount = (chunk.match(/\n/g) || []).length;
  totalRegistros += lineBreakCount;
});

readableStream.on('end', () => {
  const end = performance.now();
  const memoryAfter = process.memoryUsage().heapUsed;

  console.log(`[Lectura por Stream] Total registros procesados: ${totalRegistros}`);
  console.log(`[Lectura por Stream] Tiempo de I/O parcializado: ${((end - start) / 1000).toFixed(2)} segundos.`);
  console.log(`[Lectura por Stream] Consumo Neto de RAM: ${((memoryAfter - memoryBefore) / 1024 / 1024).toFixed(2)} MB`);
});
