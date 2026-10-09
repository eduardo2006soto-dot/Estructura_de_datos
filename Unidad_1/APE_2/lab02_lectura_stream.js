// Tarea 3: Enfoque 2 - Lectura asíncrona con Streams, S(n) = O(1)
const fs = require('fs');
const { performance } = require('perf_hooks');

const FILE_NAME = 'coordenadas_masivas.csv';

console.log(`[Lectura por Stream] Iniciando procesamiento...`);
const memoryBefore = process.memoryUsage().heapUsed;
const start = performance.now();
let totalRegistros = 0;

// Flujo de lectura secuencial no bloqueante.
// highWaterMark por defecto = 64 KiB: cada 'chunk' nunca supera ese tamaño,
// sin importar el valor de n.
const readableStream = fs.createReadStream(FILE_NAME, { encoding: 'utf-8' });

readableStream.on('data', (chunk) => {
    // ♻ INICIO DE LA ZONA DONDE SE AHORRAN CICLOS DEL GARBAGE COLLECTOR
    // El 'chunk' (<= 64 KiB) y el arreglo temporal de match() nacen y mueren dentro
    // de este callback: son objetos de vida corta que V8 limpia con Scavenge (GC menor,
    // barato). Nada se acumula en el heap, por lo que NO se promueven objetos a la
    // generación antigua y se evitan los ciclos Mark-Sweep-Compact de O(n).
    let lineBreakCount = (chunk.match(/\n/g) || []).length;
    // Solo se conserva un número entero: memoria O(1) entre chunks.
    totalRegistros += lineBreakCount;
    // ♻ FIN DE LA ZONA DE AHORRO DEL GARBAGE COLLECTOR
});

readableStream.on('end', () => {
    const end = performance.now();
    const memoryAfter = process.memoryUsage().heapUsed;
    console.log(`[Lectura por Stream] Total registros procesados: ${totalRegistros}`);
    console.log(`[Lectura por Stream] Tiempo de I/O parcializado: ${((end - start) / 1000).toFixed(2)} segundos.`);
    console.log(`[Lectura por Stream] Consumo Neto de RAM: ${((memoryAfter - memoryBefore) / 1024 / 1024).toFixed(2)} MB`);
});
