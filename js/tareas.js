let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function mostrarTareas(){

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    tareas.forEach((tarea,index)=>{

        lista.innerHTML += `
        <div class="tarea ${tarea.estado}">
            <input
                type="checkbox"
                ${tarea.estado==="hecha" ? "checked" : ""}
                onchange="cambiarEstado(${index})">

            <div class="info">
                <div class="titulo">
                    <b>${tarea.titulo}</b>
                </div>

                <div class="descripcion">
                    ${tarea.descripcion}
                </div>

                <small>Prioridad: ${tarea.prioridad}</small><br>
                <small>Fecha límite: ${tarea.fecha}</small>
            </div>

            <div class="acciones">
                <button onclick="eliminar(${index})">
                    Eliminar
                </button>
            </div>
        </div>
        `;
    });
    
    actualizarDashboard();

}

function actualizarDashboard(){

    document.getElementById("total").textContent =
    tareas.length;

    document.getElementById("pendientes").textContent =
    tareas.filter(t => t.estado === "pendiente").length;

    document.getElementById("completadas").textContent =
    tareas.filter(t => t.estado === "hecha").length;

}

function guardarTarea(){

    let nuevaTarea = {
        titulo: document.getElementById("titulo").value,
        descripcion: document.getElementById("descripcion").value,
        prioridad: document.getElementById("prioridad").value,
        fecha: document.getElementById("fechaLimite").value,
        estado: "pendiente"
    };

    tareas.push(nuevaTarea);

    localStorage.setItem(
        "tareas",
        JSON.stringify(tareas)
    );

    mostrarTareas();
    cerrarModal();
}

function eliminar(index){

    tareas.splice(index,1);

    localStorage.setItem(
        "tareas",
        JSON.stringify(tareas)
    );

    mostrarTareas();
    cerrarModal();
}

function cambiarEstado(index){

    if(tareas[index].estado==="pendiente"){
        tareas[index].estado="hecha";
    }else{
        tareas[index].estado="pendiente";
    }

    localStorage.setItem(
        "tareas",
        JSON.stringify(tareas)
    );

    mostrarTareas();
}

window.onload = function(){

    mostrarTareas();

}
