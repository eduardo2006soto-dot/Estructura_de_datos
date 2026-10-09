// Tarea 1: Generación del conjunto de datos masivo (Mock Data)
// Escribe un CSV con 10^6 registros usando un Write Stream.
const fs = require('fs');
const { performance } = require('perf_hooks');

const FILE_NAME = 'coordenadas_masivas.csv';
const N = 1000000;

console.log(`[Generador] Iniciando escritura de ${N} registros...`);
const start = performance.now();

// Utilizamos un Stream de escritura (Write Stream)
const writableStream = fs.createWriteStream(FILE_NAME);
writableStream.write('id,latitud,longitud\n'); // Cabecera

for (let i = 0; i < N; i++) {
    const lat = (Math.random() * 180 - 90).toFixed(6);
    const lng = (Math.random() * 360 - 180).toFixed(6);
    // Buffer string format
    writableStream.write(`${i},${lat},${lng}\n`);
}

writableStream.end();

writableStream.on('finish', () => {
    const end = performance.now();
    console.log(`[Generador] Archivo creado en ${((end - start) / 1000).toFixed(2)} segundos.`);
    // Calcular tamaño del archivo en disco
    const stats = fs.statSync(FILE_NAME);
    const sizeInMB = stats.size / (1024 * 1024);
    console.log(`[Generador] Peso físico en disco: ${sizeInMB.toFixed(2)} MB`);
});
