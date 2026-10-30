const historialSatelital = [];
const LIMITE_HISTORIAL = 50; // Constante C, por lo que S(n) = O(1)

function procesarCoordenadaOptimizada() {
    const paquete = {
        timestamp: Date.now(),
        lat: Math.random() * 90,
        lng: Math.random() * 180,
        payload: new Array(100000).fill('datos_topograficos_optimizados')
    };

    historialSatelital.push(paquete);

    // Desvinculación léxica: Eliminamos la referencia al objeto más antiguo
    if (historialSatelital.length > LIMITE_HISTORIAL) {
        historialSatelital.shift(); // Quitamos el primer elemento (FIFO)
    }
}

for (let i = 1; i <= 1000; i++) {
    procesarCoordenadaOptimizada();

    if (i % 200 === 0) {
        if (global.gc) global.gc(); // Forzamos el GC
        const memoryUsed = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
        console.log(`Iteración ${i} | RAM Controlada: ${memoryUsed} MB`);
    }
}