let tareas =
JSON.parse(localStorage.getItem("tareas")) || [];

let tareaEditando = null;

function guardarLocalStorage(){

    localStorage.setItem(
        "tareas",
        JSON.stringify(tareas)
    );

}

function guardarTarea(){

    let titulo =
    document.getElementById("titulo").value;

    if(titulo.trim() === ""){

        alert("Ingrese un título");
        return;

    }

    let descripcion =
    document.getElementById("descripcion").value;

    let prioridad =
    document.getElementById("prioridad").value;

    let fecha =
    document.getElementById("fechaLimite").value;

let nuevaTarea = {

    titulo: titulo,
    descripcion: descripcion,
    prioridad: prioridad,
    fecha: fecha,
    completada: tareaEditando !== null 
    ? tareas[tareaEditando].completada 
    : false

};


if(tareaEditando === null){

    // Crear nueva tarea
    tareas.push(nuevaTarea);


}else{

    // Modificar tarea existente
    tareas[tareaEditando] = nuevaTarea;

    tareaEditando = null;

}

    guardarLocalStorage();

    renderizarTareas();

    document.getElementById("titulo").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("fechaLimite").value = "";

    cerrarModal();
}

function cambiarEstado(indice){

    tareas[indice].completada =
    !tareas[indice].completada;

    guardarLocalStorage();

    renderizarTareas();
}

function eliminar(indice){

    if(confirm("¿Eliminar tarea?")){

        tareas.splice(indice,1);

        guardarLocalStorage();

        renderizarTareas();
    }

}

function editarTarea(indice){

    tareaEditando = indice;


    document.getElementById("titulo").value =
    tareas[indice].titulo;


    document.getElementById("descripcion").value =
    tareas[indice].descripcion;


    document.getElementById("prioridad").value =
    tareas[indice].prioridad;


    document.getElementById("fechaLimite").value =
    tareas[indice].fecha;


    document.querySelector(".formulario h2").textContent =
    "Modificar Tarea";


    abrirModal();

}

function actualizarDashboard(){

    let pendientes =
    tareas.filter(t => !t.completada).length;

    let completadas =
    tareas.filter(t => t.completada).length;

    document.getElementById("total").textContent =
    tareas.length;

    document.getElementById("pendientes").textContent =
    pendientes;

    document.getElementById("completadas").textContent =
    completadas;
}

function renderizarTareas(){

    document.getElementById("colTodas").innerHTML = "";
    document.getElementById("colPendientes").innerHTML = "";
    document.getElementById("colCompletadas").innerHTML = "";

    tareas.forEach((tarea,index)=>{

        let html = `
        <div class="tarea">

            <input
            type="checkbox"
            ${tarea.completada ? "checked" : ""}
            onchange="cambiarEstado(${index})">

            <strong>${tarea.titulo}</strong>

            <p>${tarea.descripcion}</p>

            <small>
                Prioridad: ${tarea.prioridad}
            </small>
            <br>

            <small>
                Fecha: ${tarea.fecha}
            </small>

            <div class="acciones">

                <button onclick="editarTarea(${index})">
                      Modificar
                </button>


                <button onclick="eliminar(${index})">
                      Eliminar
                </button>

            </div>

        </div>
        `;

        document.getElementById("colTodas")
        .innerHTML += html;

        if(tarea.completada){

            document.getElementById("colCompletadas")
            .innerHTML += html;

        }else{

            document.getElementById("colPendientes")
            .innerHTML += html;

        }

    });

    actualizarDashboard();

    buscarTarea();
}

function buscarTarea(){

    let texto =
    document.getElementById("buscar")
    .value
    .toLowerCase();

    document
    .querySelectorAll(".tarea")
    .forEach(tarea=>{

        tarea.style.display =
        tarea.innerText
        .toLowerCase()
        .includes(texto)
        ? "block"
        : "none";

    });

}

window.onload = function(){

    renderizarTareas();

}