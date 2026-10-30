const { performance } = require('perf_hooks');

const historialSatelitalGlobal = [];

console.log("[Auditoría] Iniciando prueba con GC forzado...");

function procesarCoordenada() {
    const paquete = {
        timestamp: Date.now(),
        lat: Math.random() * 90,
        lng: Math.random() * 180,
        payload: new Array(100000).fill('datos_topograficos_basura')
    };

    historialSatelitalGlobal.push(paquete);
}

for (let i = 1; i <= 500; i++) {
    procesarCoordenada();

    if (i % 100 === 0) {
        // Si global.gc está expuesto, lo forzamos a limpiar
        if (global.gc) {
            global.gc(); // Ejecutamos el barrido manual
        }
        const memoryUsed = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
        console.log(`Iteración ${i} | RAM post-GC: ${memoryUsed} MB`);
    }
}

console.log(`[Auditoría] Finalizado. El arreglo retiene ${historialSatelitalGlobal.length} registros en el Heap.`); 