let tareas = [];

/* LOGIN */

function entrar(){

    document.getElementById("login")
    .classList.add("hidden");

    document.getElementById("sistema")
    .classList.remove("hidden");
}

/* AGREGAR */

function agregarTarea(){

    let titulo =
    prompt("Título");

    let descripcion =
    prompt("Descripción");

    tareas.push({

        titulo:titulo,

        descripcion:descripcion,

        estado:"pendiente"
    });

    mostrarTareas();

    actualizarDashboard();
}

/* MOSTRAR */

function mostrarTareas(){

    let lista =
    document.getElementById("lista");

    lista.innerHTML = "";

    tareas.forEach((tarea,index)=>{

        lista.innerHTML += `

        <div class="tarea">

            <h3>${tarea.titulo}</h3>

            <p>${tarea.descripcion}</p>

            <button onclick="completar(${index})">
                Completar
            </button>

        </div>

        `;
    });
}

/* COMPLETAR */

function completar(index){

    tareas[index].estado = "completada";

    actualizarDashboard();
}

/* DASHBOARD */

function actualizarDashboard(){

    document.getElementById("total")
    .innerText = tareas.length;

    let pendientes =
    tareas.filter(t =>
        t.estado === "pendiente"
    ).length;

    let completadas =
    tareas.filter(t =>
        t.estado === "completada"
    ).length;

    document.getElementById("pendientes")
    .innerText = pendientes;

    document.getElementById("completadas")
    .innerText = completadas;
}