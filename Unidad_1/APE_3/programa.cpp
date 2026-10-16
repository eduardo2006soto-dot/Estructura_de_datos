class ObjetoDinamico {
private:
    int* datos;
public:
    ObjetoDinamico(int tamano) {
        datos = new int[tamano]; // Asignación dinámica en el Heap
    }
    
    ~ObjetoDinamico() {
        delete[] datos; // Libera la memoria interna al destruir el objeto
    }
};

void simularCarga(bool provocarFuga) {
    for (int i = 0; i < 5000; ++i) {
        ObjetoDinamico* obj = new ObjetoDinamico(10000); // Crea el objeto en el Heap
        
        if (!provocarFuga) {
            delete obj; // CORRECCIÓN: Liberamos explícitamente el objeto
        }
        // Si provocarFuga es true, no se hace delete, causando el memory leak.
    }
}

int main() {
    // 1. Provocar la fuga intencional
    simularCarga(true);
    
    // 2. Ejecutar la versión corregida
    simularCarga(false);
    
    return 0;
}