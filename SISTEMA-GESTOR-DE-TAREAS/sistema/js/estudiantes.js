// =========================
// BASE DE DATOS LOCAL
// =========================

let estudiantes =
JSON.parse(
localStorage.getItem("estudiantes")
) || [];

let asistencias =
JSON.parse(
localStorage.getItem("asistencias")
) || [];

let indiceEditar = -1;

let fotoBase64 = "";

// =========================
// CARGAR FOTO
// =========================

document
.getElementById("foto")
.addEventListener(
"change",
function(e){

    let archivo =
    e.target.files[0];

    if(!archivo) return;

    let lector =
    new FileReader();

    lector.onload =
    function(){

        fotoBase64 =
        lector.result;

    };

    lector.readAsDataURL(
    archivo
    );

});

// =========================
// INICIO
// =========================

mostrar();
mostrarAsistencias();

// =========================
// GUARDAR ESTUDIANTE
// =========================

function guardar(){

    let dni =
    document.getElementById(
    "dni"
    ).value.trim();

    let nombres =
    document.getElementById(
    "nombres"
    ).value.trim();

    let apellidos =
    document.getElementById(
    "apellidos"
    ).value.trim();

    if(
        dni === "" ||
        nombres === "" ||
        apellidos === ""
    ){

        alert(
        "Complete todos los campos"
        );

        return;
    }

    if(
        !/^\d{8}$/.test(dni)
    ){

        alert(
        "El DNI debe tener 8 dígitos"
        );

        return;
    }

    let estudiante = {

        dni,
        nombres,
        apellidos,
        estado:"Activo",
        foto: fotoBase64

    };

    if(indiceEditar === -1){

        let existe =
        estudiantes.some(

            est =>
            est.dni === dni

        );

        if(existe){

            alert(
            "Ya existe un estudiante con ese DNI"
            );

            return;
        }

        estudiantes.push(
        estudiante
        );

        alert(
        "Estudiante registrado"
        );

    }
    else{

        estudiante.estado =
        estudiantes[indiceEditar]
        .estado;

        if(
            fotoBase64 === ""
        ){

            estudiante.foto =
            estudiantes[
            indiceEditar
            ].foto;
        }

        estudiantes[
        indiceEditar
        ] = estudiante;

        indiceEditar = -1;

        alert(
        "Estudiante actualizado"
        );
    }

    guardarLocalStorage();

    mostrar();

    limpiar();
}

// =========================
// MOSTRAR ESTUDIANTES
// =========================

function mostrar(){

    let tabla =
    document.getElementById(
    "contenidoTabla"
    );

    tabla.innerHTML = "";

    if(
        estudiantes.length === 0
    ){

        tabla.innerHTML = `
        <tr>
            <td colspan="6">
                No existen estudiantes registrados
            </td>
        </tr>
        `;

        return;
    }

    estudiantes.forEach((e,i)=>{

        tabla.innerHTML += `

        <tr>

            <td>

                <img
                src="${e.foto || ''}"
                width="60"
                height="60"
                style="
                border-radius:50%;
                object-fit:cover;">

            </td>

            <td>${e.dni}</td>
            <td>${e.nombres}</td>
            <td>${e.apellidos}</td>
            <td>${e.estado}</td>

            <td>

                <button
                class="btn-editar"
                onclick="editar(${i})">
                Editar
                </button>

                <button
                class="btn-desactivar"
                onclick="desactivar(${i})">
                Desactivar
                </button>

                <button
                class="btn-eliminar"
                onclick="eliminar(${i})">
                Eliminar
                </button>

            </td>

        </tr>

        `;

    });

}

// =========================
// EDITAR
// =========================

function editar(i){

    document.getElementById(
    "dni"
    ).value =
    estudiantes[i].dni;

    document.getElementById(
    "nombres"
    ).value =
    estudiantes[i].nombres;

    document.getElementById(
    "apellidos"
    ).value =
    estudiantes[i].apellidos;

    fotoBase64 =
    estudiantes[i].foto || "";

    indiceEditar = i;
}

// =========================
// DESACTIVAR
// =========================

function desactivar(i){

    estudiantes[i].estado =
    "Inactivo";

    guardarLocalStorage();

    mostrar();

}

// =========================
// ELIMINAR
// =========================

function eliminar(i){

    if(
        confirm(
        "¿Eliminar estudiante?"
        )
    ){

        estudiantes.splice(
        i,
        1
        );

        guardarLocalStorage();

        mostrar();
    }

}

// =========================
// BUSCAR
// =========================

function buscar(){

    let texto =
    document
    .getElementById(
    "buscar"
    )
    .value
    .toLowerCase();

    let resultado =
    estudiantes.filter(

        e =>

        e.dni.includes(texto)

        ||

        e.nombres
        .toLowerCase()
        .includes(texto)

        ||

        e.apellidos
        .toLowerCase()
        .includes(texto)

    );

    mostrarFiltrado(
    resultado
    );

}

// =========================
// MOSTRAR FILTRO
// =========================

function mostrarFiltrado(lista){

    let tabla =
    document.getElementById(
    "contenidoTabla"
    );

    tabla.innerHTML = "";

    lista.forEach((e,i)=>{

        tabla.innerHTML += `

        <tr>

            <td>
                <img
                src="${e.foto || ''}"
                width="60"
                height="60"
                style="
                border-radius:50%;
                object-fit:cover;">
            </td>

            <td>${e.dni}</td>
            <td>${e.nombres}</td>
            <td>${e.apellidos}</td>
            <td>${e.estado}</td>

            <td>
                <button
                onclick="editar(${i})">
                Editar
                </button>
            </td>

        </tr>

        `;

    });

}

// =========================
// REGISTRAR ASISTENCIA
// =========================

function registrarAsistencia(){

    let dni =
    document.getElementById(
    "dniAsistencia"
    ).value.trim();

    let estado =
    document.getElementById(
    "estadoAsistencia"
    ).value;

    let fecha =
    new Date()
    .toISOString()
    .split("T")[0];

    let existe =
    asistencias.some(

        a =>

        a.dni === dni &&

        a.fecha === fecha

    );

    if(existe){

        alert(
        "Ya existe asistencia hoy"
        );

        return;
    }

    asistencias.push({

        dni,
        fecha,
        asistencia: estado

    });

    localStorage.setItem(

        "asistencias",

        JSON.stringify(
        asistencias
        )

    );

    mostrarAsistencias();

    alert(
    "Asistencia registrada"
    );

}

// =========================
// MOSTRAR ASISTENCIAS
// =========================

function mostrarAsistencias(){

    let tabla =
    document.getElementById(
    "tablaAsistencias"
    );

    tabla.innerHTML = "";

    asistencias.forEach(a=>{

        tabla.innerHTML += `

        <tr>

            <td>${a.dni}</td>
            <td>${a.fecha}</td>
            <td>${a.asistencia}</td>

        </tr>

        `;

    });

}

// =========================
// EXPORTAR JSON
// =========================

function exportarJSON(){

    let datos = {

        estudiantes:
        estudiantes,

        asistencias:
        asistencias,

        fecha:
        new Date()
        .toISOString()

    };

    let blob =
    new Blob(

        [
            JSON.stringify(
            datos,
            null,
            4
            )
        ],

        {
            type:
            "application/json"
        }

    );

    let url =
    URL.createObjectURL(
    blob
    );

    let enlace =
    document.createElement(
    "a"
    );

    enlace.href = url;

    enlace.download =
    "backup_sistema.json";

    enlace.click();

}

// =========================
// IMPORTAR JSON
// =========================

function importarJSON(event){

    let archivo =
    event.target.files[0];

    if(!archivo) return;

    let lector =
    new FileReader();

    lector.onload =
    function(e){

        try{

            let datos =
            JSON.parse(
            e.target.result
            );

            estudiantes =
            datos.estudiantes || [];

            asistencias =
            datos.asistencias || [];

            guardarLocalStorage();

            localStorage.setItem(
            "asistencias",
            JSON.stringify(
            asistencias
            ));

            mostrar();

            mostrarAsistencias();

            alert(
            "Datos restaurados correctamente"
            );

        }
        catch{

            alert(
            "Archivo JSON inválido"
            );
        }

    };

    lector.readAsText(
    archivo
    );

}

// =========================
// GUARDAR LOCALSTORAGE
// =========================

function guardarLocalStorage(){

    localStorage.setItem(

        "estudiantes",

        JSON.stringify(
        estudiantes
        )

    );

}

// =========================
// LIMPIAR
// =========================

function limpiar(){

    document.getElementById(
    "dni"
    ).value = "";

    document.getElementById(
    "nombres"
    ).value = "";

    document.getElementById(
    "apellidos"
    ).value = "";

    document.getElementById(
    "foto"
    ).value = "";

    fotoBase64 = "";

    indiceEditar = -1;

}