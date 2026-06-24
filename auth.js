// =========================
// VERIFICAR SESIÓN
// =========================

const sesion =
JSON.parse(
localStorage.getItem(
"sesion"
)
);

// Si no existe sesión
if(!sesion){

    alert(
    "Debe iniciar sesión"
    );

    window.location.href =
    "login.html";

}

// =========================
// MOSTRAR USUARIO
// =========================

function obtenerUsuario(){

    return sesion.usuario;

}

function obtenerRol(){

    return sesion.rol;

}

// =========================
// CERRAR SESIÓN
// =========================

function cerrarSesion(){

    if(
        confirm(
        "¿Desea cerrar sesión?"
        )
    ){

        localStorage.removeItem(
        "sesion"
        );

        localStorage.removeItem(
        "rol"
        );

        alert(
        "Sesión finalizada"
        );

        window.location.href =
        "login.html";
    }

}

// =========================
// PROTEGER MÓDULOS
// =========================

function esAdministrador(){

    return (
        sesion.rol ===
        "Administrador"
    );

}

function esDocente(){

    return (
        sesion.rol ===
        "Docente"
    );

}