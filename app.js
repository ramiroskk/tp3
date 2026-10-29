const readline = require('readline-sync');

function Tarea(id, nombre, descripcion, estado, dificultad) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.estado = estado;
    this.dificultad = dificultad;
}

function TaskApp() {
    this.tareas = [];
    this.contadorId = 1;
}

TaskApp.prototype.pedirEstado = function(mensaje) {
    const validos = ['P', 'E', 'T', 'C'];
    while (true) {
        let entrada = readline.question(mensaje).trim().toUpperCase();
        if (validos.includes(entrada)) {
            return entrada;
        }
        console.log("Estado invalido. Opciones: P, E, T, C.");
    }
};

TaskApp.prototype.pedirDificultad = function(mensaje) {
    while (true) {
        let entrada = readline.questionInt(mensaje);
        if (entrada >= 1 && entrada <= 3) {
            return entrada;
        }
        console.log("Dificultad invalida. Debe ser 1, 2 o 3.");
    }
};

TaskApp.prototype.agregarTarea = function() {
    console.log("\nAGREGAR TAREA\n");
    const nombre = readline.question("Nombre: ");
    const descripcion = readline.question("Descripcion: ");
    const estado = this.pedirEstado("Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): ");
    const dificultad = this.pedirDificultad("Dificultad (1 / 2 / 3): ");

    const nuevaTarea = new Tarea(this.contadorId++, nombre, descripcion, estado, dificultad);
    this.tareas.push(nuevaTarea);
    console.log("\nTarea guardada con exito.\n");
};

TaskApp.prototype.verTareas = function() {
    let subopcion;
    do {
        console.log("\nMIS TAREAS\n");
        console.log(" [1] Todas");
        console.log(" [2] Pendientes");
        console.log(" [3] En curso");
        console.log(" [4] Terminadas");
        console.log(" [5] Canceladas\n");
        console.log(" [0] Volver\n");

        subopcion = readline.questionInt("> ");

        if (subopcion >= 1 && subopcion <= 5) {
            console.log("\nLISTA DE TAREAS");
            let encontrado = false;

            for (let i = 0; i < this.tareas.length; i++) {
                const tarea = this.tareas[i];
                const coincide = 
                    subopcion === 1 ||
                    (subopcion === 2 && tarea.estado === 'P') ||
                    (subopcion === 3 && tarea.estado === 'E') ||
                    (subopcion === 4 && tarea.estado === 'T') ||
                    (subopcion === 5 && tarea.estado === 'C');

                if (coincide) {
                    console.log(`ID: ${tarea.id} | Nombre: ${tarea.nombre} | Estado: [${tarea.estado}] | Dificultad: ${tarea.dificultad}`);
                    console.log(`Descripcion: ${tarea.descripcion}\n`);
                    encontrado = true;
                }
            }

            if (!encontrado) {
                console.log("No se encontraron tareas en esta categoria.");
            } else {
                const id_editar = readline.questionInt("\nIngresa el ID de la tarea a editar (o presiona 0 para volver): ");
                
                if (id_editar !== 0) {
                    let tareaAEditar = null;
                    for (let i = 0; i < this.tareas.length; i++) {
                        if (this.tareas[i].id === id_editar) {
                            tareaAEditar = this.tareas[i];
                            break;
                        }
                    }

                    if (tareaAEditar) {
                        console.log(`\n[Modificando Tarea ID ${tareaAEditar.id}]`);
                        tareaAEditar.nombre = readline.question("Nuevo nombre: ");
                        tareaAEditar.descripcion = readline.question("Nueva descripcion: ");
                        tareaAEditar.estado = this.pedirEstado("Nuevo estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): ");
                        tareaAEditar.dificultad = this.pedirDificultad("Nueva dificultad (1 / 2 / 3): ");
                        console.log("\nTarea editada con exito.\n");
                    } else {
                        console.log("\nNo se encontro ninguna tarea con ese ID.\n");
                    }
                }
            }
        }
    } while (subopcion !== 0);
};

TaskApp.prototype.buscarTarea = function() {
    let subopcion;
    do {
        console.log("\nBUSCAR TAREA\n");
        const id_tarea = readline.questionInt("Inserta el ID de la tarea (o presiona 0 para volver): ");

        if (id_tarea === 0) break;

        let tarea = null;
        for (let i = 0; i < this.tareas.length; i++) {
            if (this.tareas[i].id === id_tarea) {
                tarea = this.tareas[i];
                break;
            }
        }

        if (tarea) {
            console.log("\nTarea Encontrada:");
            console.log(`ID: ${tarea.id} | Nombre: ${tarea.nombre} | Estado: [${tarea.estado}] | Dificultad: ${tarea.dificultad}`);
            console.log(`Descripcion: ${tarea.descripcion}`);
        } else {
            console.log("No se encontro ninguna tarea con ese ID.");
        }

        subopcion = readline.questionInt("\nPresiona 0 para volver al menu principal u otro numero para seguir buscando: ");
    } while (subopcion !== 0);
};

TaskApp.prototype.iniciar = function() {
    let opcion;
    do {
        console.log("\nMENU PRINCIPAL\n");
        console.log(" [1] Ver Mis Tareas");
        console.log(" [2] Buscar una Tarea");
        console.log(" [3] Agregar una Tarea");
        console.log(" [0] Salir.\n");

        opcion = readline.questionInt("> ");

        switch (opcion) {
            case 1:
                this.verTareas();
                break;
            case 2:
                this.buscarTarea();
                break;
            case 3:
                this.agregarTarea();
                break;
            case 0:
                console.log("\nPrograma finalizado.");
                break;
            default:
                console.log("\nOpcion invalida.\n");
        }
    } while (opcion !== 0);
};

const app = new TaskApp();
app.iniciar();